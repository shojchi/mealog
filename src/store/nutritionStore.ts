import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Nutrition } from "../types";

interface NutritionState {
  goals: Nutrition;
  setGoals: (goals: Nutrition) => void;
}

const DEFAULT_GOALS: Nutrition = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 65,
};

export const useNutritionStore = create<NutritionState>()(
  persist(
    (set) => ({
      goals: DEFAULT_GOALS,
      setGoals: (goals) => set({ goals }),
    }),
    {
      name: "mealog-nutrition-goals",
    },
  ),
);
