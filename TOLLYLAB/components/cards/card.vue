<template>
  <div class="bg-transparent_white rounded-lg md:p-4 min-[425px]:p-2  duration-300 ease-in-out hover:scale-110 shadow-lg w-64 cursor-pointer" @click="goToProduct">
    <!-- Image Section -->
    <div class="overflow-hidden flex justify-center rounded-lg mb-4">
      <img :src="imageSrc" alt="Product Image" class="md:w-3/4 object-cover min-[425px]:w-[61px] min-[425px]:h-[87.43px]" />
    </div>

    <!-- Text Section -->
    <div class="flex  justify-center items-center">
      <h3 class="text-white text-lg font-semibold  min-[425px]:text-xs  text-center items-center ">{{ productName }}</h3>
      
    </div>

    <!-- Rating and Action Section -->
     <div class="w-full flex justify-center">
       <div class="flex justify-center   md:w-3/4  items-center md:mt-2">
         <!-- <div class="flex items-center text-yellow-400">
           <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.664 5.102a1 1 0 00.95.69h5.367c.969 0 1.371 1.24.588 1.81l-4.342 3.165a1 1 0 00-.364 1.118l1.664 5.102c.3.921-.755 1.688-1.539 1.118l-4.342-3.165a1 1 0 00-1.176 0l-4.342 3.165c-.783.57-1.838-.197-1.539-1.118l1.664-5.102a1 1 0 00-.364-1.118L2.48 10.53c-.783-.57-.381-1.81.588-1.81h5.367a1 1 0 00.95-.69l1.664-5.102z" />
           </svg>
           <span class="text-white text-sm">4.5</span>
         </div>
    --><span class="text-gray-300 text-sm min-[425px]:hidden">Rs.{{ productPrice }}</span>

         <nuxt-link class="md:p-2 min-[425px]:pt-0.5 flex justify-center rounded-full transition" :to="`/product/${productId}`">
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"  class="min-[425px]:w-9/12">
             <path fill="currentColor" d="M12 15.289L15.288 12L12 8.711l-.688.689l2.1 2.1H8.5v1h4.912l-2.1 2.1zM12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709" />
           </svg>
         </nuxt-link>
       </div>
     </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
  imageSrc: String,
  productName: String,
  productPrice: Number,
  productId: [String, Number], // Assuming you have a unique identifier for each product
});


const router = useRouter();

const goToProduct = () => {
  router.push(`/products/${productId}`);  // Navigate to the product detail page
};
</script>
