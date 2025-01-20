<template>
  <v-container>
    <v-row class="d-flex justify-between align-center" :style="{ padding: '20px' }">
      <!-- Ürünler Dizisini Döngüyle Göster -->
      <v-col v-for="(product, index) in products" :key="index" cols="6" sm="4" md="2">
        <v-card
          @mouseover="hovered[index] = true"
          @mouseleave="hovered[index] = false"
          height="400"
          class="product-card"
        >
          <!-- Ürün Resmi -->
          <v-img
            :src="hovered[index] ? product.hoverImage : product.image"
            :alt="product.name"
            height="200"
          ></v-img>

          <!-- Ürün Adı, Yıldızlar ve Yorum Sayısı -->
          <v-card-title>
            <span class="headline">{{ product.name }}</span>
          </v-card-title>

          <!-- Yıldızlar ve Yorum Sayısı -->
          <v-card-subtitle>
            <span class="stars">
              <span v-for="n in 5" :key="n" class="star" :class="n <= product.rating ? 'filled' : ''">
                ★
              </span>
            </span>
          </v-card-subtitle>

          <!-- Ürün Fiyatı -->
          <v-card-subtitle>
            <span class="font-weight-bold">₺{{ product.price.toFixed(2) }}</span>
          </v-card-subtitle>

          <!-- Hover Durumunda Gösterilecek Buton -->
          <v-card-actions>
            <button
              v-if="hovered[index]"
              type="button"
              class="btn btn-danger w-100 hover-button custom-button"
              @click="addToCart(product)"
            >
              Sepete Ekle
            </button>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useCartStore } from '@/store/cart'; // Pinia Store'u kullanma

const cartStore = useCartStore();  // Pinia Store'u kullanma

// Ürün Tipini Tanımlıyoruz
interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;  // Yıldız sayısı
  ratingCount: number; // Yorum sayısı
  image: string;
  hoverImage: string; // Hover için ikinci resim
}

// Ürünler Dizisi
const products = ref<Product[]>([
  {
    id: 1,
    name: "Fenerbahçe Yüzüncü Yıl Forması",
    price: 9999.9,
    rating: 5,
    ratingCount: 72,
    image: "productImages/last_image.png",
    hoverImage: "productImages/last_image_2.png", // İkinci resim
  },
  {
    id: 2,
    name: "Ipad Pro",
    price: 21000,
    rating: 4,
    ratingCount: 100,
    image: "productImages/product1_1.png",
    hoverImage: "productImages/product3_2.png", // İkinci resim
  },
  {
    id: 3,
    name: "Samsung Tab 14",
    price: 16000,
    rating: 5,
    ratingCount: 200,
    image: "productImages/product2_1.png",
    hoverImage: "productImages/product2_2.png", // İkinci resim
  },
  {
    id: 4,
    name: "Ipad Air",
    price: 200.0,
    rating: 3,
    ratingCount: 50,
    image: "productImages/product3_1.png",
    hoverImage: "productImages/product3_2.png", // İkinci resim
  },
  {
    id: 5,
    name: "Logitech MX Keys",
    price: 3811.0,
    rating: 5,
    ratingCount: 72,
    image: "productImages/image.png",
    hoverImage: "productImages/hower.png", // İkinci resim
  },
]);

// Hover Durumunu İzlemek İçin Değişken
const hovered = ref<boolean[]>(Array(products.value.length).fill(false)); // Hover durumu her ürün için

// Sepete Ekleme Fonksiyonu
const addToCart = (product: Product) => {
  // Add product to cart with initial quantity 1 and selected state (optional)
  cartStore.addProduct({ ...product, quantity: 1, selected: true });
};
</script>

<style scoped>
/* Kartı ve içeriklerini özelleştirmek için stil ekleyebilirsiniz */
.v-container {
  width: 95%; 
  max-width: 100%;
  display: flex;
  align-items: space;
}

.product-card {
  margin-top: 20px;
  border-radius: 10px;
  width: 100%;
  height: 398px;
  border: 10px;
}

.v-img {
  border-top-left-radius: 10px;
  border-top-right-radius: 50px;
}

.hover-button {
  transition: background-color 0.3s ease;
  opacity: 0;
  height: 30px; /* Buton yüksekliğini azaltıyoruz */
  font-size: 14px; /* Yazı fontunu küçültüyoruz */
  line-height: 30px; /* Buton yüksekliğiyle uyumlu olmasını sağlıyoruz */
}

.product-card:hover .hover-button {
  opacity: 1;
}

.custom-button {
  background-color: #ff5733 !important; /* Özel arka plan rengi */
  border-color: #ff5733 !important;    /* Kenar rengi */
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  text-align: center; /* Yazının ortalanması */
  padding: 0 10px; /* İç boşlukları azaltıyoruz */
}

.hover-button:hover {
  background-color: #e5781e; /* Hover durumunda buton rengi */
  color: white;
}

.v-card-title, .v-card-subtitle {
  text-align: center;
}

.v-card-subtitle {
  font-weight: bold;
}

.stars {
  display: inline-block;
  color: #d4cbc3;
}

.star {
  font-size: 1em;
}

.star.filled {
  color: rgba(246,159,41,255)
}

.headline {
  font-size: 12px;
  font-weight: bold;
}

/* Flexbox düzeni ile kartlar arasındaki boşluğu ayarlıyoruz */
.v-row {
  display: flex;
  justify-content: space-between; /* Kartlar arasında eşit boşluk bırak */
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
}
</style>
