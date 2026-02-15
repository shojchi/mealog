import Dexie, { type EntityTable } from "dexie";
import type { Meal, WeeklyPlan, ShoppingList } from "../types";

/**
 * Mealog Database
 *
 * Uses Dexie.js as a wrapper around IndexedDB for offline-first data storage.
 */
export class MealogDatabase extends Dexie {
  // Tables
  meals!: EntityTable<Meal, "id">;
  weeklyPlans!: EntityTable<WeeklyPlan, "id">;
  shoppingLists!: EntityTable<ShoppingList, "id">;

  constructor() {
    super("MealogDB");

    // Define schema version 2 (added weekStartDate index for shopping lists)
    this.version(2).stores({
      // Meals table
      // Indexed by: id (primary), mealType, labels (multi-entry), createdAt
      meals: "++id, mealType, *labels, createdAt, name",

      // Weekly plans table
      // Indexed by: id (primary), weekStart (for finding specific week)
      weeklyPlans: "++id, weekStart, createdAt",

      // Shopping lists table
      // Indexed by: id (primary), weekStartDate (for finding list by week)
      shoppingLists: "++id, weekStartDate, createdAt",
    });
  }
}

// Create and export database instance
export const db = new MealogDatabase();

/**
 * Helper function to get meals by type
 */
export async function getMealsByType(type: string) {
  return await db.meals.where("mealType").equals(type).toArray();
}

/**
 * Helper function to get meals by label
 */
export async function getMealsByLabel(label: string) {
  return await db.meals.where("labels").equals(label).toArray();
}

/**
 * Helper function to get current week's plan
 */
export async function getCurrentWeekPlan() {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - now.getDay() + 1); // Get Monday
  monday.setHours(0, 0, 0, 0);

  return await db.weeklyPlans
    .where("weekStart")
    .equals(monday.getTime())
    .first();
}

/**
 * Helper function to search meals by name
 */
export async function searchMeals(query: string) {
  const lowerQuery = query.toLowerCase();
  return await db.meals
    .filter((meal) => meal.name.toLowerCase().includes(lowerQuery))
    .toArray();
}
