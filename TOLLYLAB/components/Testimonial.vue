<template>
  <section class="py-16 pt-48 text-white text-center relative">
    <!-- Heading and Subheading -->
    <div class="mb-12">
      <h2 class="text-4xl md:text-7xl font-bold">TESTIMONIALS</h2>
      <p class="text-base md:text-lg text-Light_grey mt-4 px-8 md:px-48 mx-auto font-extralight">
        Discover the hottest and most popular artists in the industry today. Keep your music library fresh and up-to-date with our curated selection of trending musicians, bands, and singers. From emerging talents to established stars, we've got you covered.
      </p>
    </div>
    
    <!-- Decorative Line Image -->
    <img src="/assets/images/linegrad.png" alt="Decorative Line" class="absolute -z-10 w-full opacity-85 h-auto" />

    <!-- Cards Container -->
    <div class="flex flex-col md:flex-row gap-8 justify-center items-center space-y-6 md:space-y-0 pt-16">
      <!-- Loop through the cards with staggered positions -->
      <div
        v-for="index in 5"
        :key="index"
        :class="[
          'h-[28rem] w-60',
          index % 2 === 0 ? 'pt-14' : 'mt-0', // Stagger the card position
          index % 3 === 0 ? 'mt-12' : '' // Add more variation
        ]"
        class="max-md:hidden"
      >
        <div class="w-full py-8 bg-transparent_white rounded-2xl items-center flex flex-col justify-center">
          <div class="overflow-hidden rounded-full">
            <img src="assets/images/anne-marie.png" alt="Dua Lipa" class="w-40 h-40 object-cover" />
          </div>
          <h3 class="text-lg font-semibold mt-4">Dua Lipa</h3>
          <p class="text-gray-400 mb-4">16 songs</p>
          <div class="flex items-center justify-between text-gray-500">
            <span>Explore</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 15.289L15.288 12L12 8.711l-.688.689l2.1 2.1H8.5v1h4.912l-2.1 2.1zM12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709"></path>
            </svg>
          </div>
        </div>
      </div>
      



      <div class="min-[450px]:hidden flex justify-center">
        <div
          v-for="index in 3"
          :key="index"
          :class="[
            'h-[28rem] w-36 ',
            'px-1',
            
            
          ]"
          
        >
          <div class="w-full py-6 bg-transparent_white rounded-2xl  items-center flex flex-col justify-center">
            <div class="overflow-hidden rounded-full">
              <img src="assets/images/anne-marie.png" alt="Dua Lipa" class="w-16 h-16 object-cover" />
            </div>
            <h3 class="text-sm font-semibold mt-4">Dua Lipa</h3>
            <p class="text-gray-400 text-sm mb-4">16 songs</p>
            <div class="flex items-center justify-between text-gray-500">
              <span class="text-sm">Explore</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="w-sm">
                <path fill="currentColor" d="M12 15.289L15.288 12L12 8.711l-.688.689l2.1 2.1H8.5v1h4.912l-2.1 2.1zM12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709"></path>
              </svg>
            </div>
          </div>
        </div> 

      </div>
    </div>

    <!-- See All Button -->
    <!-- <div class="mt-20">
      <button class="px-8 py-3 bg-Yellow text-white font-semibold rounded-md hover:bg-white hover:text-Yellow transition">
        See All (382)
      </button>
    </div> -->
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Declare the reactive variable 'x'
const x = ref();

// Function to update the limit based on window width
function updateLimit() {
  if (window.matchMedia('(max-width: 425px)').matches) {
    x.value = 3; // Set x to 3 if the min-width is 425px or larger
  } else {
    x.value = 5; // Otherwise, set x to 5
  }
}

// Call the function when the component is mounted
onMounted(() => {
  updateLimit(); // Set the initial limit
  window.addEventListener('resize', updateLimit); // Listen for window resize events
});

// Clean up the event listener when the component is destroyed
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateLimit);
});
</script>
