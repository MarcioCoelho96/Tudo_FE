import AsyncStorage from "@react-native-async-storage/async-storage";
import { Region } from "react-native-maps";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AddressData } from "./userStore.types";

export interface UserState {
  location: Region | null;
  address: AddressData | null;
}

export interface UserAction {
  setLocation: (location: Region | null) => void;
  setAddress: (address: AddressData | null) => void;
}

export interface UserStore extends UserAction, UserState {}
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      location: null,
      address: null,

      setAddress: (address) => set({ address }),
      setLocation: (location) => set({ location }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
