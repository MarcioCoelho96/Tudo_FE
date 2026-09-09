import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "@/app/components/ProductList";

export interface OrderState {
  orderedProducts: Product[];
  productsToPay: Product[];
}

export interface OrderAction {
  setOrderedProducts: (products: Product[]) => void;
  clearOrderedProducts: () => void;
  setProductsToPay: (products: Product[]) => void;
}

export interface OrderStore extends OrderState, OrderAction {}
export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orderedProducts: [],
      productsToPay: [],

      setOrderedProducts: (orderedProducts) => set({ orderedProducts }),
      clearOrderedProducts: () => set({ orderedProducts: [] }),
      setProductsToPay: (productsToPay) => set({ productsToPay }),
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
