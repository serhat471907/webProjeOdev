<template>
  <img src="public/images/image copy.png" alt="" style="width: 100%; height: 200px;">
  <div class="template">
    <div class="cart">
      <!-- Product List -->
      <div class="products">
        <div
          class="product"
          v-for="(product, index) in cartStore.items"
          :key="product.id"
        >
          <!-- Checkbox (if you want to add selection logic) -->
          <input
            type="checkbox"
            v-model="cartStore.items[index].selected"
            @change="cartStore.updateTotal"
          />
          <img :src="product.image" alt="product" />
          <span>{{ product.name }}</span>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(product.id)">-</button>
            <input
              type="number"
              :value="product.quantity"
              min="1"
              @input="updateQuantity($event, product.id)"
            />
            <button @click="increaseQuantity(product.id)">+</button>
          </div>
          <span>{{ product.price * product.quantity }}₺</span>
        </div>
      </div>

      <!-- Summary -->
      <div class="summary">
        <h3>Toplam</h3>
        <div
          class="summary-item"
          v-for="(product, index) in selectedProducts"
          :key="index"
        >
          <span>{{ product.name }}</span>
          <span>{{ product.price * product.quantity }}₺</span>
        </div>
        <p>Total: {{ total }}₺</p>
        <div class="block">
        <button
          @click="completePurchase"
          class="btn btn-danger full-width-btn"
          style="background-color: rgb(255, 96, 0);"
        >
          Alışverişi Tamamla
        </button>

      </div>
      </div>
    </div>
  </div>
</template>



  <script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useCartStore } from "../store/cartStore";

  export default defineComponent({
    name: "Cart",
    setup() {
      const cartStore = useCartStore(); // Pinia store'u kullanma
      const router = useRouter(); // Vue Router kullanımı

      // Seçilen ürünlerin computed property olarak hesaplanması
      const selectedProducts = computed(() =>
        cartStore.items.filter((product) => product.selected)
      );

      // Toplam fiyatın computed property olarak hesaplanması
      const total = computed(() =>
        selectedProducts.value.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        )
      );

      // Miktar artırma fonksiyonu
      const increaseQuantity = (productId: number) => {
        const product = cartStore.items.find((item) => item.id === productId);
        if (product) {
          cartStore.updateQuantity(productId, product.quantity + 1);
        }
      };

      // Miktar azaltma fonksiyonu
      const decreaseQuantity = (productId: number) => {
        const product = cartStore.items.find((item) => item.id === productId);
        if (product && product.quantity > 1) {
          cartStore.updateQuantity(productId, product.quantity - 1);
        }
      };

      // Miktarı manuel olarak güncelleme
      const updateQuantity = (event: Event, productId: number) => {
        const value = (event.target as HTMLInputElement).valueAsNumber;
        if (value > 0) {
          cartStore.updateQuantity(productId, value);
        }
      };

      // Satın alma işlemini tamamlama
      const completePurchase = () => {
        alert(`Alışveriş tamamlandı! Toplam: ${total.value}₺`);
      };

      // Ana sayfaya yönlendirme
      const navigateHome = () => {
        router.push('/'); // Ana sayfaya yönlendir
      };

      return {
        cartStore, // Template içinde kullanmak için store'u expose et
        selectedProducts,
        total,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        completePurchase,
        navigateHome, // Ana sayfaya dön fonksiyonunu expose et
      };
    },
  });
  </script>




  <style scoped>
  .cart {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .products {
    flex: 2;
  }

  .product {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    align-items: center;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  input[type="number"] {
    width: 50px;
    text-align: center;
  }

  input[type="checkbox"] {
    margin-right: 10px;
  }

  .summary {
    flex: 1;
    border: 1px solid #ddd;
    padding: 10px;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  button {
    padding: 5px 10px;
    cursor: pointer;
  }

  img {
    width: 100px;
    height: 150px;
  }
  .template {

    margin-left: 5%;
    width: 90%;
  }
  input[type="checkbox"] {
    -webkit-appearance: none; /* Tarayıcı varsayılan stilini kaldırır */
    -moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #FF6000; /* Turuncu renkli kenarlık */
    border-radius: 3px; /* Hafif yuvarlatılmış köşeler */
    background-color: white; /* Arka plan beyaz */
    cursor: pointer;
    position: relative;
  }

  /* Checkbox işaretlendiğinde */
  input[type="checkbox"]:checked {
    background-color: #FF6000; /* Turuncu arka plan */
    border-color: #FF6000; /* Turuncu kenarlık */
    
  }

  input[type="checkbox"]:checked::after {
    content: '✓'; /* Tik işareti */
    color: white; /* Beyaz renk */
    font-size: 14px; /* Tik boyutu */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
  }
  </style>
