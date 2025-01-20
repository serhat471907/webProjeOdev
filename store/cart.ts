// src/store/cartStore.ts
import { defineStore } from 'pinia';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  ratingCount: number;
  image: string;
  hoverImage: string;
  quantity: 1;
  selected: boolean;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [] as Product[],  // Başlangıçta sepet boş
  }),

  getters: {
    selectedProducts(state): Product[] {
      return state.products.filter((product) => product.selected);
    },
    total(state): number {
      return this.selectedProducts.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
    },
  },

  actions: {
    addProduct(product: Product) {
      const existingProduct = this.products.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.products.push({ ...product, quantity: 1, selected: true });
      }
    },
    increaseQuantity(index: number) {
      this.products[index].quantity++;
    },
    decreaseQuantity(index: number) {
      if (this.products[index].quantity > 1) {
        this.products[index].quantity--;
      }
    },
    toggleSelection(index: number) {
      this.products[index].selected = !this.products[index].selected;
    },
    removeProduct(index: number) {
      this.products.splice(index, 1);
    },
  },
});
