import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CommonState {
  refreshToken: string | null;
}

export interface CommonAction {
  setRefreshToken: (refreshToken: string | null) => void;
}

export interface CommonStore extends CommonState, CommonAction {}
export const useUserStore = create<CommonStore>()(
  persist(
    (set) => ({
      refreshToken: null,

      setRefreshToken: (refreshToken) => set({ refreshToken }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
