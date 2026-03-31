import type { Meal } from "../../types";
import { breakfastSeeds } from "./breakfasts";
import { lunchSeeds } from "./lunches";
import { dinnerSeeds } from "./dinners";
import { snackSeeds } from "./snacks";

/**
 * Complete seed catalog — all categories combined.
 *
 * Total: 100 meals
 *   - 25 breakfasts
 *   - 30 lunches
 *   - 30 dinners
 *   - 15 snacks
 */
export const allSeedMeals: Omit<Meal, "id" | "createdAt" | "updatedAt">[] = [
  ...breakfastSeeds,
  ...lunchSeeds,
  ...dinnerSeeds,
  ...snackSeeds,
];

export { breakfastSeeds, lunchSeeds, dinnerSeeds, snackSeeds };
