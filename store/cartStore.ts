import type { Product } from './Product';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: (): { items: Product[] } => ({
    items: [], // Product türünden öğeleri saklayacak
  }),
  actions: {
    addProduct(product: Product) {
      if (!product || !product.id || product.quantity <= 0) {
        console.error('Invalid product data provided to addProduct');
        return;
      }

      const existingItem = this.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1, selected: product.selected || false });
      }
    },
    updateTotal() {
      return this.items
        .filter(item => item.selected)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);
    },    
    removeProduct(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId);
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = Math.max(quantity, 1); // Ensure quantity is at least 1
      }
    },
  },
});
