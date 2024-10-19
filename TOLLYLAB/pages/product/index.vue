<template>
  <div class="pt-36 relativez z-50">
    <div>
      <img src="~/assets/images/left.png" class="-z-10 left-0 top-0 absolute " />
      <img src="~/assets/images/right.png" class="-z-10 right-0 top-0 absolute" />
    </div>
    <div class="flex flex-col justify-center">
      <h1 class="text-center text-8xl font-bold leading-none tracking-tight">FILM PHOTOGRAPHY <br/> IS BACK</h1>
      <p class="text-center pt-3 text-Light_grey">Explore our range of TOLLYGRUNGE films.</p>
    </div>
    <div class="flex justify-center pt-24">
      <div class="grid justify-center grid-rows-4 gap-28 grid-cols-3 pt-36">
        <card 
          v-for="(product, index) in products"
          :key="index"
          :imageSrc="product.image"
          :productName="product.name"
          :productPrice="product.price"
          :productId="product.id" 
          
          
        >
        
        </card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import card from '~/components/cards/card.vue';
import axios from 'axios';

definePageMeta({
  layout: 'custom-layout' // Assign the custom layout here
})

const products = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/products/');
    console.log('Fetched Products:', response.data[0].id); 
    products.value = response.data.map(product => ({
      ...product,
      image: `http://localhost:8000${product.image}`, 
       // Ensure full URL is constructed
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
});

// Function to log product ID when clicked

</script>

<style scoped>
/* Add any additional styles here */
</style>
