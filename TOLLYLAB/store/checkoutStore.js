  // stores/useCartStore.js
  import { defineStore } from 'pinia';

  export const useCheckoutStore = defineStore('checkoutStore', {
    state: () => ({
      product: null,
    }),
    actions: {
      setProductDetails(productDetails) {
        this.product = productDetails;
      },
    },
  });
