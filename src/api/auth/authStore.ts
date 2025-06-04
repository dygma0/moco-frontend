import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
  accessToken: string | null;
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
  };
  isAuthenticated: boolean;
  setAuth: (
    accessToken: string,
    userId: string,
    name: string,
    email: string,
  ) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: {
        id: null,
        name: null,
        email: null,
      },
      isAuthenticated: false,
      setAuth: (accessToken, userId, name, email) =>
        set({
          accessToken,
          user: {
            id: userId,
            name,
            email,
          },
          isAuthenticated: true,
        }),
      clearAuth: () =>
        set({
          accessToken: null,
          user: {
            id: null,
            name: null,
            email: null,
          },
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
