<template>
  <div class="pt-20">
    <div>
      <img src="~/assets/images/Ellipse.png" class="-z-10 left-0 top-16 absolute" />
    </div>
    
    <!-- Product Details Section -->
    <div v-if="product" class="pt-36 max-w-4xl pl-8 mx-auto p-6 flex justify-center items-center space-x-20 rounded-lg">
      <!-- Product Image -->
      <div>
        <img src="~/assets/images/small_left.png" class="-z-10 left-0 top-0 absolute" />
        <img src="~/assets/images/small_left.png" class="-z-10 right-0 top-0 rotate-180 absolute" />
      </div>

      <!-- Product Info -->
      <div class="mb-6 bg-transparent_white px-6 py-10 rounded-xl">
        <img :src="getProductImageUrl(product.image)" alt="Product Image" class="rounded-lg">
      </div>

      <div>
        <h1 class="text-4xl font-bold text-white mb-4">{{ product.name }}</h1>
        <p class="font-extralight text-white mb-6">Rs. {{ product.price }}</p>
        <p class="text-sm text-white mb-6 border-b pb-4">{{ product.description }}</p>

        <!-- Quantity Selector and Buy Now Button -->
        <div class="flex items-center space-x-4">
          <div class="flex items-center rounded-md">
            <button @click="decrementQuantity" class="px-4 py-2 text-white bg-transparent border rounded-l hover:bg-Yellow fade-in-out duration-300">-</button>
            <span class="w-12 h-fit  border-white py-2 border bg-inherit text-center text-white">{{productStore.product.quantity }}</span>
            <button @click="incrementQuantity" class="px-4 py-2 border border-white text-white bg-Yellow rounded-r">+</button>
          </div>

          <!-- Buy Now Button -->
          <button @click="buyNow" class="px-6 py-2 text-white bg-Yellow rounded-lg hover:bg-white hover:text-Yellow">
            Buy Now
          </button>
        </div>

        <!-- Add to Cart Button -->
        <div class="mt-8">
          <button @click="addToCart" class="px-6 py-2 text-white bg-Yellow rounded-lg hover:bg-white hover:text-Yellow">
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="text-center text-gray-500">
      Loading...
    </div>

    <!-- Additional 6 Cards -->
    <div class="flex justify-center pt-96">
      <div class="grid justify-center grid-rows-2 gap-28 grid-cols-3">
        <card 
          v-for="(product, index) in products.slice(0, 6)"
          :key="index"
          :imageSrc="product.image"
          :productName="product.name"
          :productPrice="product.price"
          :productId="product.id"
        />
      </div>
      <img src="~/assets/images/small_line.png" class="-z-10 left-0 h-[829px] w-[870px] rotate-180 absolute" />
      <img src="~/assets/images/small_line.png" class="-z-10 right-0 h-[829px] w-[870px] absolute" />
    </div>
  </div>

  <!-- See More Link -->
  <div class="w-full flex justify-center pt-36">
    <nuxt-link to="/product" class="bg-Yellow px-6 py-3 rounded-lg hover:bg-white hover:text-Yellow">
      See more
    </nuxt-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import card from '~/components/cards/card.vue';


import { useProductStore } from '~/store/useProductStore';
import { useAuthStore } from '~/store/useAuthStore'; // Import the Auth store


const product = ref(null);
const products = ref([]);
const route = useRoute();
const router = useRouter();
const productId = route.params.id;// Get the product ID from the route
const productStore = useProductStore(); // Access the product store

const pro = productStore.product;
const authStore = useAuthStore();




// const cartStore = useCartStore(); // Use the cart store

onMounted(async () => {

  
  try {
    // Fetch the individual product details
    const response = await axios.get(`http://localhost:8000/api/products/${productId}/`);
    product.value = response.data;
    
  //  console.log('checking the description',product.value) -- working
    // authStore.checkLogin();
    productStore.setProductDetails(response.data);

    console.log('id check', product.value)

    // console.log('ok so this is a try: ',productStore.product.image)
    ///media/products/sampleproduct1_GNb4Uyr.png

    // Fetch the list of products for the additional cards
    const productsResponse = await axios.get('http://localhost:8000/api/products/');
    products.value = productsResponse.data.map(product => ({
      ...product,
      image: `http://localhost:8000${product.image}`,
    }));
  } catch (error) {
    console.error('Failed to fetch product details:', error);
  }
});

// Function to construct the full image URL
const getProductImageUrl = (imagePath) => {
  
  return `http://localhost:8000${imagePath}`;

}

// Quantity management


const incrementQuantity = () => {
  productStore.incrementQuantity();
};

// Decrement quantity
const decrementQuantity = () => {
  productStore.decrementQuantity();
};

// const getProductImageUrl = (imagePath) => {
//   return `http://localhost:8000${imagePath}`;
// }



// Function to handle Buy Now
const buyNow = () => {

  if (authStore.isAuthenticated && product.value) {
    router.push('/checkout');
  } else {
    alert('You need to log in to proceed with the purchase.');
    router.push('/signin');  // Redirect to login page if not logged in
  }
};



// Function to add product to cart
const addToCart = () => {
  cartStore.addToCart({
    productName: product.value.name,
    productPrice: product.value.price,
    quantity: quantity.value,
  });
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
