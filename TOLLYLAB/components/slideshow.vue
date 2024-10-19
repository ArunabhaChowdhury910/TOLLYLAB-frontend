<template>
    <div id="default-carousel" class="relative w-full h-full" data-carousel="slide">
      <!-- Carousel wrapper -->
      <div class="relative  overflow-hidden rounded-lg w-full h-full">
        <!-- Item 1 -->
        <div
          v-show="currentSlide === 0"
          class="duration-100 ease-in-out"
          data-carousel-item
        >
          <img
            src="@/assets/images/random_pic.png"
            class="  thumbnail w-full h-full thumbnail "
            alt="Image 1"
            @click="expandImage"
          />
          <div
                v-if="isExpanded"
                class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                @click="closeImage"
                >
      <img src="~/assets/images/random_pic.png" alt="Expanded Image" class="expanded-image" />
    </div>

        </div>
        <!-- Item 2 -->
        <div
          v-show="currentSlide === 1"
          class="duration-100 ease-in-out"
          data-carousel-item
        >
          <img
            src="@/assets/images/randompic2.png"
            class="block w-full h-full object-cover"
            alt="Image 2"
             @click="expandImage"
          />
          <div
                v-if="isExpanded"
                class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                @click="closeImage"
                >
      <img src="~/assets/images/randompic2.png" alt="Expanded Image" class="expanded-image" />
    </div>

        </div>
      </div>
      <!-- Slider indicators -->
      <div
        class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse"
      >
        <button
          v-for="(slide, index) in totalSlides"
          :key="index"
          @click="setSlide(index)"
          :class="[
            'w-3 h-3 rounded-full',
            currentSlide === index ? 'bg-white' : 'bg-gray-500',
          ]"
          aria-current="true"
          aria-label="'Slide ' + (index + 1)"
          :data-carousel-slide-to="index"
        ></button>
      </div>
      <!-- Slider controls -->
      <button
        @click="prevSlide"
        type="button"
        class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button
        @click="nextSlide"
        type="button"
        class="absolute top-0  right-0 z-10 flex items-center justify-end h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
 

// State to track whether the image is expanded or not
const isExpanded = ref(false);

// Function to expand the image
const expandImage = () => {
  isExpanded.value = true;
};

// Function to close the expanded image
const closeImage = () => {
  isExpanded.value = false;
};
  
  // Carousel state
  const currentSlide = ref(0);
  const totalSlides = 2; // Total number of slides
  
  // Function to go to the next slide
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % totalSlides;
  };
  
  // Function to go to the previous slide
  const prevSlide = () => {
    currentSlide.value =
      (currentSlide.value - 1 + totalSlides) % totalSlides;
  };
  
  // Function to manually set the slide using indicators
  const setSlide = (index: number) => {
    currentSlide.value = index;
  };
  
  // Automatically move to the next slide every 5 seconds
  onMounted(() => {
    setInterval(nextSlide, 3000);
  });
  </script>
  
  <style scoped>
  /* Style the carousel images */
  img {
    transition: opacity 0.3s ease-in-out;
  }
  
  /* Style the slider indicators */
  button {
    cursor: pointer;
  }
  
  button:focus {
    outline: none;
  }
  </style>
  