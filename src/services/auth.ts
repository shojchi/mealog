import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { app } from "../firebase";

// Initialize Firebase Auth
export const auth = getAuth(app);

// Authentication Error Handler
export const getAuthErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Invalid email address format.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";
    default:
      return "An unexpected authentication error occurred.";
  }
};

// Google Sign-In Provider
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error: unknown) {
    console.error("Google Sign-In Error:", error);
    const errorCode =
      error instanceof Error && "code" in error
        ? (error as { code?: string }).code
        : "unknown";
    return { user: null, error: getAuthErrorMessage(errorCode || "unknown") };
  }
};

// Email/Password Helpers
export const signInWithEmail = async (email: string, pass: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    return { user: result.user, error: null };
  } catch (error: unknown) {
    const errorCode =
      error instanceof Error && "code" in error
        ? (error as { code?: string }).code
        : "unknown";
    return { user: null, error: getAuthErrorMessage(errorCode || "unknown") };
  }
};

export const signUpWithEmail = async (email: string, pass: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    return { user: result.user, error: null };
  } catch (error: unknown) {
    const errorCode =
      error instanceof Error && "code" in error
        ? (error as { code?: string }).code
        : "unknown";
    return { user: null, error: getAuthErrorMessage(errorCode || "unknown") };
  }
};

// Sign Out Helper
export const logOut = () => signOut(auth);

// Subscribe to Auth State Changes
export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
