import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db as firestoreDb } from "./db";
import { db as localDb } from "../db/database";
import { useAuthStore } from "../store/authStore";
import type { Meal, WeeklyPlan } from "../types";

let mealsUnsubscribe: (() => void) | null = null;
let weeklyPlansUnsubscribe: (() => void) | null = null;

/**
 * Starts listening to Firestore for the given householdId.
 * Performs Down-Sync logic (Firestore -> Dexie)
 */
export function startDownSync(householdId: string) {
  stopDownSync(); // Ensure we don't have dangling listeners

  // 1. Listen to Meals
  const mealsQuery = query(
    collection(firestoreDb, "meals"),
    where("householdId", "==", householdId),
  );
  mealsUnsubscribe = onSnapshot(mealsQuery, async (snapshot) => {
    const localMeals = await localDb.meals.toArray();
    const localMealsMap = new Map(localMeals.map((m) => [m.id, m]));

    snapshot.docChanges().forEach(async (change) => {
      const firestoreMeal = change.doc.data() as Meal;
      firestoreMeal.id = Number(change.doc.id); // Re-attach numeric Dexie ID

      if (change.type === "added" || change.type === "modified") {
        const localMeal = localMealsMap.get(firestoreMeal.id);

        // Conflict Resolution: Last-Write-Wins
        if (
          !localMeal ||
          (firestoreMeal.lastUpdated || 0) > (localMeal.lastUpdated || 0)
        ) {
          // Firestore is newer (or it's new), apply to local DB
          // Strip undefined so Dexie doesn't complain, ensure dirty is false since it came from cloud
          await localDb.meals.put({ ...firestoreMeal, dirty: false });
        }
      }
      if (change.type === "removed") {
        await localDb.meals.delete(Number(change.doc.id));
      }
    });
  });

  // 2. Listen to WeeklyPlans
  const plansQuery = query(
    collection(firestoreDb, "weeklyPlans"),
    where("householdId", "==", householdId),
  );
  weeklyPlansUnsubscribe = onSnapshot(plansQuery, async (snapshot) => {
    const localPlans = await localDb.weeklyPlans.toArray();
    const localPlansMap = new Map(localPlans.map((p) => [p.id, p]));

    snapshot.docChanges().forEach(async (change) => {
      const firestorePlan = change.doc.data() as WeeklyPlan;
      firestorePlan.id = Number(change.doc.id);

      if (change.type === "added" || change.type === "modified") {
        const localPlan = localPlansMap.get(firestorePlan.id);

        if (
          !localPlan ||
          (firestorePlan.lastUpdated || 0) > (localPlan.lastUpdated || 0)
        ) {
          await localDb.weeklyPlans.put({ ...firestorePlan, dirty: false });
        }
      }
      if (change.type === "removed") {
        await localDb.weeklyPlans.delete(Number(change.doc.id));
      }
    });
  });
}

export function stopDownSync() {
  if (mealsUnsubscribe) mealsUnsubscribe();
  if (weeklyPlansUnsubscribe) weeklyPlansUnsubscribe();
  mealsUnsubscribe = null;
  weeklyPlansUnsubscribe = null;
}

/**
 * Pushes all pending 'dirty' records from Dexie up to Firestore.
 * Performs Up-Sync logic (Dexie -> Firestore)
 */
export async function pushUpSync() {
  const { user } = useAuthStore.getState();
  if (!user || navigator.onLine === false) return; // Only sync if logged in and online

  const householdId = user.currentHouseholdId;

  // 1. Push Dirty Meals
  // Dexie sometimes needs explicit filter for booleans if index is not handling it right
  const actualDirtyMeals = await localDb.meals
    .filter((meal) => meal.dirty === true)
    .toArray();

  for (const meal of actualDirtyMeals) {
    if (!meal.id) continue;
    const docRef = doc(firestoreDb, "meals", meal.id.toString());
    const payload = { ...meal, householdId, dirty: false };
    delete payload.id; // Don't store primary DB key inside the document itself if doc name is key

    try {
      await setDoc(docRef, payload);
      // Mark as clean locally
      await localDb.meals.update(meal.id, { dirty: false, householdId });
    } catch (e) {
      console.error("Failed to up-sync meal:", e);
    }
  }

  // 2. Push Dirty WeeklyPlans
  const dirtyPlans = await localDb.weeklyPlans
    .filter((plan) => plan.dirty === true)
    .toArray();

  for (const plan of dirtyPlans) {
    if (!plan.id) continue;
    const docRef = doc(firestoreDb, "weeklyPlans", plan.id.toString());
    const payload = { ...plan, householdId, dirty: false };
    delete payload.id;

    try {
      await setDoc(docRef, payload);
      await localDb.weeklyPlans.update(plan.id, { dirty: false, householdId });
    } catch (e) {
      console.error("Failed to up-sync weekly plan:", e);
    }
  }
}

// Global Online Listener
window.addEventListener("online", () => {
  console.log("App is back online, triggering up-sync...");
  pushUpSync();
});
