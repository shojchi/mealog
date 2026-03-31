import { db } from "./database";
import { allSeedMeals } from "./seeds";

/**
 * Current seed data version.
 *
 * Bump this number whenever new meals are added to the seed catalog.
 * The seedDatabase() function uses this to determine whether the user
 * needs new seed data injected.
 *
 * History:
 *   v1 — Original 11 meals (3 breakfasts, 3 lunches, 3 dinners, 2 snacks)
 *   v2 — Expanded to 100 meals with USDA-verified nutrition data
 */
const SEED_VERSION = 2;

/**
 * Seed data - re-exported for backward-compatible imports.
 *
 * @deprecated  Import from `./seeds` directly for the full catalog.
 */
export const seedMeals = allSeedMeals;

/**
 * Populate (or update) the database with seed data.
 *
 * Behaviour:
 *   1. If no seed version is recorded yet (fresh install OR pre-v4 DB),
 *      treat every meal as potentially new.
 *   2. Deduplicate by meal name so existing user-customised meals are
 *      never overwritten.
 *   3. Write the current SEED_VERSION to the meta table so subsequent
 *      launches skip the work.
 */
export async function seedDatabase() {
  // Read the persisted seed version (0 = never seeded / pre-v4 upgrade)
  let currentVersion = 0;
  try {
    const meta = await db.meta.get("seedVersion");
    if (meta) {
      currentVersion = Number(meta.value) || 0;
    }
  } catch {
    // meta table may not exist yet during the Dexie upgrade; treat as 0
    currentVersion = 0;
  }

  if (currentVersion >= SEED_VERSION) {
    console.log(
      `ℹ️ Seed version ${currentVersion} is up-to-date (latest: ${SEED_VERSION}), skipping seed`,
    );
    return;
  }

  // Collect names of meals already in the database so we never duplicate
  const existingNames = new Set(
    (await db.meals.toArray()).map((m) => m.name),
  );

  const newMeals = allSeedMeals
    .filter((m) => !existingNames.has(m.name))
    .map((meal) => ({
      ...meal,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

  if (newMeals.length > 0) {
    await db.meals.bulkAdd(newMeals);
    console.log(`✅ Seeded ${newMeals.length} new meals (v${SEED_VERSION})`);
  } else {
    console.log(
      `ℹ️ All ${allSeedMeals.length} seed meals already exist, nothing to add`,
    );
  }

  // Persist the new seed version
  await db.meta.put({ key: "seedVersion", value: SEED_VERSION });
}
