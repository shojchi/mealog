import { create } from "zustand";
import type { UserProfile } from "../types";

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true, // Initially true while Firebase checks local session
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));
