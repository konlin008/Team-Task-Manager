import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      setUser: (userData) =>
        set({
          user: userData,
        }),
      setIsCheckingAuth: (value) => set({ isCheckingAuth: value }),
      logout: () =>
        set({
          user: null,
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
