import { create } from "zustand";
import type { WeeklyPlan, DayPlan, ScheduledMeal } from "../types";
import { db } from "../db";
import { startOfWeek, addDays } from "date-fns";

interface WeekPlanState {
  currentWeek: Date;
  weeklyPlan: WeeklyPlan | null;
  loading: boolean;

  // Actions
  setCurrentWeek: (date: Date) => void;
  loadWeekPlan: () => Promise<void>;
  addMealToDay: (dayIndex: number, mealId: number) => Promise<void>;
  removeMealFromDay: (dayIndex: number, mealIndex: number) => Promise<void>;
  createEmptyWeek: () => Promise<void>;
}

export const useWeekPlanStore = create<WeekPlanState>((set, get) => ({
  currentWeek: startOfWeek(new Date(), { weekStartsOn: 1 }), // Monday
  weeklyPlan: null,
  loading: false,

  setCurrentWeek: (date: Date) => {
    const monday = startOfWeek(date, { weekStartsOn: 1 });
    set({ currentWeek: monday });
    get().loadWeekPlan();
  },

  loadWeekPlan: async () => {
    set({ loading: true });
    const { currentWeek } = get();

    try {
      // Try to find existing plan for this week
      const existingPlan = await db.weeklyPlans
        .where("weekStart")
        .equals(currentWeek.getTime())
        .first();

      if (existingPlan) {
        set({ weeklyPlan: existingPlan, loading: false });
      } else {
        // Create empty week if none exists
        await get().createEmptyWeek();
      }
    } catch (error) {
      console.error("Failed to load week plan:", error);
      set({ loading: false });
    }
  },

  createEmptyWeek: async () => {
    const { currentWeek } = get();

    // Create 7 empty days
    const days: DayPlan[] = Array.from({ length: 7 }, (_, i) => ({
      date: addDays(currentWeek, i),
      meals: [],
    }));

    const newPlan: Omit<WeeklyPlan, "id"> = {
      weekStart: currentWeek.getTime(), // Store as timestamp, not Date
      days,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const id = await db.weeklyPlans.add(newPlan as WeeklyPlan);
      const createdPlan = await db.weeklyPlans.get(id);
      set({ weeklyPlan: createdPlan || null, loading: false });
    } catch (error) {
      console.error("Failed to create week plan:", error);
      set({ loading: false });
    }
  },

  addMealToDay: async (dayIndex: number, mealId: number) => {
    const { weeklyPlan } = get();
    if (!weeklyPlan) return;

    const newMeal: ScheduledMeal = {
      mealId,
      completed: false,
    };

    const updatedDays = [...weeklyPlan.days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      meals: [...updatedDays[dayIndex].meals, newMeal],
    };

    const updatedPlan: WeeklyPlan = {
      ...weeklyPlan,
      days: updatedDays,
      updatedAt: new Date(),
    };

    try {
      await db.weeklyPlans.update(weeklyPlan.id!, {
        days: updatedDays,
        updatedAt: new Date(),
      });
      set({ weeklyPlan: updatedPlan });
    } catch (error) {
      console.error("Failed to add meal:", error);
    }
  },

  removeMealFromDay: async (dayIndex: number, mealIndex: number) => {
    const { weeklyPlan } = get();
    if (!weeklyPlan) return;

    const updatedDays = [...weeklyPlan.days];
    const dayMeals = [...updatedDays[dayIndex].meals];
    dayMeals.splice(mealIndex, 1);

    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      meals: dayMeals,
    };

    const updatedPlan: WeeklyPlan = {
      ...weeklyPlan,
      days: updatedDays,
      updatedAt: new Date(),
    };

    try {
      await db.weeklyPlans.update(weeklyPlan.id!, {
        days: updatedDays,
        updatedAt: new Date(),
      });
      set({ weeklyPlan: updatedPlan });
    } catch (error) {
      console.error("Failed to remove meal:", error);
    }
  },
}));
