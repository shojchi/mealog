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

    // Define schema version 3 (Added multi-user sync fields)
    this.version(3)
      .stores({
        // Indexed by: id (primary), householdId, dirty (for up-sync), lastUpdated
        meals:
          "++id, mealType, *labels, createdAt, name, householdId, dirty, lastUpdated",
        weeklyPlans:
          "++id, weekStart, createdAt, householdId, dirty, lastUpdated",
      })
      .upgrade((trans) => {
        // Mark all existing data as belonging to 'local' and needing sync
        // They will be moved to the user's real householdId upon first sync
        return Promise.all([
          trans.table("meals").toCollection().modify({
            householdId: "local",
            dirty: true,
            lastUpdated: Date.now(),
          }),
          trans.table("weeklyPlans").toCollection().modify({
            householdId: "local",
            dirty: true,
            lastUpdated: Date.now(),
          }),
        ]);
      });
  }
}

// Create and export database instance
export const db = new MealogDatabase();

/**
 * Helper function to get meals by type
 */
export async function getMealsByType(type: string, householdId?: string) {
  const query = db.meals.where("mealType").equals(type);
  if (householdId) {
    // Note: Due to Dexie indexing limits, we filter household ID in memory for now
    const meals = await query.toArray();
    return meals.filter(
      (m) => m.householdId === householdId || m.householdId === "local",
    );
  }
  return await query.toArray();
}

/**
 * Helper function to get meals by label
 */
export async function getMealsByLabel(label: string, householdId?: string) {
  const query = db.meals.where("labels").equals(label);
  if (householdId) {
    const meals = await query.toArray();
    return meals.filter(
      (m) => m.householdId === householdId || m.householdId === "local",
    );
  }
  return await query.toArray();
}

/**
 * Helper function to get current week's plan
 */
export async function getCurrentWeekPlan(householdId?: string) {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - now.getDay() + 1); // Get Monday
  monday.setHours(0, 0, 0, 0);

  const query = db.weeklyPlans.where("weekStart").equals(monday.getTime());

  if (householdId) {
    const plans = await query.toArray();
    return plans.find(
      (p) => p.householdId === householdId || p.householdId === "local",
    );
  }

  return await query.first();
}

/**
 * Helper function to search meals by name
 */
export async function searchMeals(query: string, householdId?: string) {
  const lowerQuery = query.toLowerCase();

  if (householdId) {
    return await db.meals
      .filter(
        (meal) =>
          meal.name.toLowerCase().includes(lowerQuery) &&
          (meal.householdId === householdId || meal.householdId === "local"),
      )
      .toArray();
  }

  return await db.meals
    .filter((meal) => meal.name.toLowerCase().includes(lowerQuery))
    .toArray();
}
