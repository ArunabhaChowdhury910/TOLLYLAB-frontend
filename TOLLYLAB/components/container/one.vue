<template>
  <section class="pt-48 pb-36 -z-50 bg-Primary_black text-white text-center relative">
    <!-- Main Heading -->
    <h1 class="text-8xl max-[450px]:text-4xl md:text-8xl font-bold leading-none tracking-tight">
      FILMS ARE STILL <br> AFFORDABLE.
    </h1>

    <!-- Subheading -->
    <p class="text-lg md:text-xl pt-4 md:pt-8 text-Light_grey  font-extralight">
      Explore our range of <span class="font-semibold text-Light_grey">TOLLYGRUNGE</span> films.
    </p>

    <div class="">

      <img
      src="/assets/images/redline.png"
        alt="Decorative Line"
        class="absolute bottom-36 md:left-60 md:w-[900px]  h-auto -z-10   "
      />
    </div>
    <!-- Decorative Line Image -->

    <!-- Cards Container with Scroll -->
     <div class="flex justify-center">
       
       <div class="relative flex items-center md:w-3/4  min-[425px]:w-[400px] justify-center space-x-6 mt-12 md:mt-16">
         <!-- Left Scroll Button --> 
         <button @click="scrollLeft" class="p-2 rounded-full  hover:text-Yellow z-50">
           <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" class="min-[425px]:w-11/12  ">
             <path
               fill="currentColor"
               d="M10.589 12.5H15q.213 0 .356-.144t.144-.357t-.144-.356T15 11.5h-4.411l1.765-1.766q.14-.133.14-.34t-.14-.348t-.347-.14q-.208 0-.341.14l-2.389 2.389q-.242.242-.242.565t.242.566l2.389 2.388q.14.14.344.13q.204-.009.344-.15t.14-.347t-.14-.34zm1.414 8.5q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
             />
           </svg>
         </button>
   
         <!-- Scrollable Cards -->
         <div ref="scrollContainer" @click="move" class="flex max-[425px]:w-[425px]   md:p-4 cursor-pointer overflow-x-scroll overflow-y-hidden no-scrollbar md:space-x-24 min-[425px]:space-x-4 scroll-container">
           <!-- <card v-for="index in 5" :key="index" class="flex-shrink-0 w-[70%] md:w-1/4" /> -->
           <card 
            v-for="(product, index) in products.slice(0, 6)"
            :key="index"
            :imageSrc="product.image"
            :productName="product.name"
            :productPrice="product.price"
            :productId="product.id"
            class="md:flex-shrink-0 w-full md:w-fit h-fit "
            
          />
        
        
         </div>
   
         <!-- Right Scroll Button -->
         <button @click="scrollRight" class=" rounded-full  z-50 hover:text-Yellow">
           <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" class="min-[425px]:w-11/12">
             <path
               fill="currentColor"
               d="m13.412 12.5l-1.766 1.766q-.14.14-.13.334q.009.194.15.335q.14.14.347.14t.34-.14l2.37-2.37q.243-.242.243-.565t-.243-.565l-2.388-2.389q-.14-.14-.335-.14t-.334.14t-.141.348t.14.34l1.747 1.766H9q-.213 0-.356.144t-.144.357t.144.356T9 12.5zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
             />
           </svg>
         </button>
       </div>
       <div>
         <!-- <img src="/assets/images/fade_left_black.png" class="rotate-180 absolute  border right-52  h-96 bottom-36 z-40"/> -->
       </div>
     </div>
  </section>
</template>

<script setup>
import card from '../cards/card.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const move = () =>{
  window.location.href = '/product';
}

// Reference to the scroll container
const scrollContainer = ref(null);

// State for storing products
const products = ref([]);

// Scroll left function
function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: -scrollContainer.value.offsetWidth / 3,
      behavior: 'smooth'
    });
  }
}

// Scroll right function
function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: scrollContainer.value.offsetWidth / 3,
      behavior: 'smooth'
    });
  }
}

// Fetch products on mounted
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/products/');
    products.value = response.data.map(product => ({
      ...product,
      image: `http://localhost:8000${product.image}`, // Ensure full URL for images
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
