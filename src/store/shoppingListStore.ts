import { create } from "zustand";
import { db } from "../db";
import type { ShoppingList, ShoppingListItem } from "../types";
import { useWeekPlanStore } from "./weekPlanStore";

interface ShoppingListState {
  shoppingList: ShoppingList | null;
  loading: boolean;
  generateFromWeekPlan: () => Promise<void>;
  toggleItemChecked: (itemId: string) => Promise<void>;
  clearCompleted: () => Promise<void>;
  loadShoppingList: () => Promise<void>;
}

export const useShoppingListStore = create<ShoppingListState>((set, get) => ({
  shoppingList: null,
  loading: false,

  generateFromWeekPlan: async () => {
    set({ loading: true });
    try {
      const weekPlan = useWeekPlanStore.getState().weeklyPlan;

      if (!weekPlan) {
        console.error("No weekly plan found");
        set({ loading: false });
        return;
      }

      // Collect all meal IDs from the week
      const mealIds = new Set<number>();
      weekPlan.days.forEach((day) => {
        day.meals.forEach((scheduledMeal) => {
          mealIds.add(scheduledMeal.mealId);
        });
      });

      // Fetch all meals
      const meals = await db.meals.bulkGet(Array.from(mealIds));
      const validMeals = meals.filter((m) => m !== undefined);

      // Aggregate ingredients by category
      const ingredientMap = new Map<string, ShoppingListItem>();

      validMeals.forEach((meal) => {
        meal.ingredients.forEach((ingredient) => {
          const key = `${ingredient.category}-${ingredient.name}`;

          if (ingredientMap.has(key)) {
            // Combine quantities
            const existing = ingredientMap.get(key)!;
            existing.totalQuantity += ingredient.quantity;
          } else {
            // Create new item
            ingredientMap.set(key, {
              id: `${Date.now()}-${Math.random()}`,
              ingredientName: ingredient.name,
              totalQuantity: ingredient.quantity,
              unit: ingredient.unit,
              category: ingredient.category || "other",
              purchased: false,
            });
          }
        });
      });

      // Create shopping list
      const items = Array.from(ingredientMap.values());
      const newList: ShoppingList = {
        id: Date.now(),
        weekStartDate: weekPlan.weekStart,
        items,
        createdAt: new Date(),
      };

      // Save to database
      await db.shoppingLists.put(newList);

      set({ shoppingList: newList, loading: false });
    } catch (error) {
      console.error("Failed to generate shopping list:", error);
      set({ loading: false });
    }
  },

  toggleItemChecked: async (itemId: string) => {
    const { shoppingList } = get();
    if (!shoppingList) return;

    const updatedItems = shoppingList.items.map((item) =>
      item.id === itemId ? { ...item, purchased: !item.purchased } : item,
    );

    const updatedList = { ...shoppingList, items: updatedItems };

    await db.shoppingLists.put(updatedList);
    set({ shoppingList: updatedList });
  },

  clearCompleted: async () => {
    const { shoppingList } = get();
    if (!shoppingList) return;

    const updatedItems = shoppingList.items.filter((item) => !item.purchased);
    const updatedList = { ...shoppingList, items: updatedItems };

    await db.shoppingLists.put(updatedList);
    set({ shoppingList: updatedList });
  },

  loadShoppingList: async () => {
    set({ loading: true });
    try {
      const weekPlan = useWeekPlanStore.getState().weeklyPlan;

      if (!weekPlan) {
        set({ loading: false, shoppingList: null });
        return;
      }

      // Find shopping list for current week
      const lists = await db.shoppingLists
        .where("weekStartDate")
        .equals(weekPlan.weekStart) // weekStart is now already a timestamp
        .toArray();

      set({
        shoppingList: lists.length > 0 ? lists[0] : null,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to load shopping list:", error);
      set({ loading: false });
    }
  },
}));
