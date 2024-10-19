<template>
  <section class="py-12 pt-48 -z-50 bg-Primary_black text-white text-left relative">
    <!-- Main Heading -->
    <h2 class="pl-16 md:pl-48 text-4xl max-[450px]:text-4xl md:text-8xl font-bold leading-none tracking-tight">
      explore <br> FRAME COUNTER.
    </h2>

    <!-- Subheading -->
    <div class="w-full flex justify-center">
      <p class="pl-8 md:pl-48 max-[425px]:text-xs max-[425px]:w-4/5  text-base md:text-lg text-Light_grey pt-4 md:pt-6 pb-6 font-extralight">
        Explore <span class="font-semibold text-Light_grey">FRAME COUNTER</span>, our online image gallery. All these images were <br> developed and scanned at <span class="font-semibold text-Light_grey">TOLLYGRUNGE</span>.
      </p>

    </div>

    <!-- Decorative Line Image -->
    <img
      src="/assets/images/redline.png"
      alt="Decorative Line"
      class="absolute -z-10  md:left-60 md:w-[900px] h-auto"
    />

    <!-- Cards Container -->
    <div class="flex flex-col md:flex-row md:justify-around max-[425px]:justify-center px-8 md:px-2   tems-center space-y-6 pt-8 md:space-y-0">
      
    <!-- Auto-scrolling Film Cards Container -->
    <div class="flex  justify-around  overflow-x-auto  max-[425px]:w-full scroll-container overflow-y-hidden no-scrollbar lefttorightscroll">
      <!-- Display images fetched from the API -->
     
      <div v-for="(image, index) in images" :key="index" class=" py-8 px-2 w-[45%] ">
        <div class=" rounded-lg duration-300 ease-in-out hover:scale-110  w-64 cursor-pointer">
          
          <img :src="image.image" alt="Image" class="md:w-[20rem] md:h-[20rem] min-[425px]:w-40 min-[425px]:h-40  object-cover rounded-lg" />
          <img :src="image.image" alt="Image" class="h-6 w-full  -z-20 blur-md object-cover rounded-lg" />
          
        </div>
      </div>

    </div>
  </div>
</section>
<div class="w-full  flex justify-center pt-24">
  <a class="px-4 bg-Yellow hover:text-Yellow hover:bg-white py-2 rounded-lg cursor-pointer " href="/gallery">See More</a>
</div>
</template>

<script setup>
import card from '../cards/card.vue';
import { onMounted, ref } from 'vue';
import Image_card from '../cards/image_card.vue';


import axios from 'axios';
const galleryImages = ref([]); 
const images = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/gallery/images/');
    // Assuming the API returns an array of image objects with url, width, and height
    images.value = response.data;
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
  }
});
  

onMounted(() => {
  const scrollContainer = document.querySelector('.lefttorightscroll');

  function autoScroll() {
    const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const duration = 16000; // Total duration for the scroll (in milliseconds)
    const scrollStep = scrollWidth / (duration / 8); // Scroll step for approx. 60 FPS

    // Adjust scroll position
    scrollContainer.scrollLeft -= scrollStep;

    // Loop the scroll when it reaches the beginning
    if (scrollContainer.scrollLeft <= 0) {
      scrollContainer.scrollLeft = scrollWidth;
    }
  }

  // Set interval for smooth scrolling
  const intervalId = setInterval(autoScroll, 32); // Approximately 60 FPS

  // Cleanup interval when the component is unmounted
  window.addEventListener('beforeunload', () => {
    clearInterval(intervalId);
  });
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


.glass{

  background: linear-gradient(135deg, Orgba(255, 255, 255, 0.1), Orgba(255, 255, 255, 0));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border:1px solid Orgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 Orgba(0, 0, 0, 0.37);
 

}
</style>
