import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CommonState {
  refreshToken: string | undefined;
  categorySelected: string | undefined;
}

export interface CommonAction {
  setRefreshToken: (refreshToken: string | undefined) => void;
  setCategorySelected: (category: string | undefined) => void;
}

const initialState = {
  refreshToken: undefined,
  categorySelected: undefined,
};

export interface CommonStore extends CommonState, CommonAction {}
export const useCommonStore = create<CommonStore>()(
  persist(
    (set) => ({
      ...initialState,
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setCategorySelected: (category) => set({ categorySelected: category }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
