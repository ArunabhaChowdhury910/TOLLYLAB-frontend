<template>
  <div class="">
    <div class="relative  ">
      <div class="absolute z-10 opacity-85 text-white top-0 right-0 -mt-2 -mr-2 w-6 h-6 bg-Light_Black rounded-full flex items-center justify-center text-sm font-bold">
        {{ productCount }}
      </div>
    </div>
    <img :src="getProductImageUrl(productStore.product.image)" class="w-16 h-20 "/>
    <!-- <div class="absolute top-0 right-0 -mt-2 -mr-2 w-6 h-6 bg-Light_Black rounded-full flex items-center justify-center text-sm font-bold">
        {{ productCount }}
      </div> -->
  </div>
    
     
      
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';

  import { useProductStore } from '~/store/useProductStore';
  
  const productStore = useProductStore();

  const product = productStore.product;
  
  const productCount = ref(0); // Initial product count
  
  // Simulating a fetch for the product count (replace with your actual logic)
  const fetchProductCount = () => {
    // Replace this with your actual API call or logic to fetch the dynamic product count
    productCount.value = product.quantity; // Example count, replace with real data
  };
  
  // Lifecycle hook to fetch the data when the component is mounted
  onMounted(() => {
    fetchProductCount();
    console.log('product.image', product.image)
  });

  const getProductImageUrl = (imagePath) => {
  
  return `http://localhost:8000${imagePath}`;


}
  </script>
  
  <style scoped>
  /* Customize your styles further if needed */
  </style>
  