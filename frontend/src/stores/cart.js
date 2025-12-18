import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: []
  }),
  getters: {
    totalItems: (state) =>
      state.cartItems.reduce((t, i) => t + i.qty, 0)
  }
});
