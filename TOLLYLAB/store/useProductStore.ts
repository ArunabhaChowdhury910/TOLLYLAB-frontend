import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    product: {
      id: null,
      name: '',
      price: 0,
      description: '',
      quantity: 1,
      image: '',
    },
  }),
  actions: {
    setProductDetails(productDetails: { id: null; name: string; price: number; description: string; image: string; quantity:number}) {
      this.product = { ...productDetails, quantity: productDetails.quantity || 1 };
      localStorage.setItem('product', JSON.stringify(this.product));
    },

    loadProductFromLocalStorage() {
      const storedProduct = localStorage.getItem('product');
      if (storedProduct) {
        this.product = JSON.parse(storedProduct);
      }
    },

    incrementQuantity() {
      this.product.quantity++;
      this.updateLocalStorage();
    },

    decrementQuantity() {
      if (this.product.quantity > 1) {
        this.product.quantity--;
        this.updateLocalStorage();
      }
    },
    
    setProductQuantity(quantity: number) {
      this.product.quantity = quantity;
      this.updateLocalStorage();
    },
    
    clearProductDetails() {
      this.product = {
        id: null,
        name: '',
        price: 0,
        description: '',
        quantity: 1,
        image: '',
      };
      this.updateLocalStorage();
    },

    removeProduct() {
      this.clearProductDetails();
      localStorage.removeItem('product');
    },

    updateLocalStorage() {
      localStorage.setItem('product', JSON.stringify(this.product));
    },
  },
});