import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { app } from "../firebase";
import type { UserProfile } from "../types";

export const db = getFirestore(app);

/**
 * Ensures a UserProfile and their isolated personal Household exists in Firestore.
 * Automatically called on first login.
 */
export async function initializeUserRecord(
  uid: string,
  email: string | null,
  displayName: string | null,
): Promise<UserProfile> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }

  // Create personal household first
  const householdRef = await addDoc(collection(db, "households"), {
    name: "Personal Space",
    members: [uid],
  });

  const householdId = householdRef.id;

  const newUserProfile: UserProfile = {
    uid,
    email,
    displayName,
    currentHouseholdId: householdId,
  };

  // Create user record pointing to the new personal household
  await setDoc(userRef, newUserProfile);

  return newUserProfile;
}
