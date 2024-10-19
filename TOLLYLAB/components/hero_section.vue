<template>
  <section class="relative min-[425px]:  bg-cover md:pt-20 min-[425px]:pt-12 flex items-center justify-start pl-6 md:pl-20">
    <!-- Content -->
    <div class=" z-40 text-left leading-none px-4 md:px-6">
      
      <h1  v-if="showFirstText" class="min-[425px]:text-5xl md:text-8xl font-bold  light-text">
        
        REDISCOVER <br /> THE JOY OF <br />ANALOG  <br /> PHOTOGRAPHY
        
      </h1> 
      <h1 v-motion-slide-bottom v-if="showSecondText" class="text-5xl  md:text-9xl special_blur font-bold text-white leading-none tracking-tight ">
        THE RED<br /> LIGHT <br />
        IS STILL ON.
        
      </h1>
      <p v-if="showSecondText" class="mt-4 text-base md:text-lg text-Light_grey font-extralight">
        Enjoy the magic of film photography with our darkroom services. 
      </p>
      <div class="mt-8"> 
        <button
          class="px-6 md:px-8 py-2 md:py-3 bg-Yellow text-white font-semibold rounded-md hover:bg-white hover:text-Yellow transition"
        >
          Process Now
        </button>
      </div>
    </div>

    <!-- Background Images -->
    <div>
      <img
        src="/assets/images/background.png"
        alt="Background"
        class="absolute right-0 -top-12 w-7/12 h-auto   -z-10"
      />
      <img
        src="/assets/images/vector.png"
        alt="Vector"
        class="absolute right-0  min-[425px]:top-24 md:top-[28rem] w-5/12 md:w-4/12 h-auto  -z-10"
      />
    </div>
  </section>
</template>

<script setup>

import { ref, onMounted } from "vue";

const showFirstText = ref(true);
const showSecondText = ref(false);

onMounted(() => {
  // First, the first text appears, then fades away after a delay
  setTimeout(() => {
    showFirstText.value = false;
    showSecondText.value = true;
  }, 4000); // 8 seconds (adjust as needed)
});
</script>

<style scoped>
.special_blur{
  text-shadow: 6px 4px 15px #FF0000
};

.light-text {
  animation: fadeOutText 4s linear forwards;
  animation-delay: 4s; /* Delay fade-out until text is fully revealed */
}

@keyframes fadeOutText {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* Fade-In for Second Text */
.fade-in {
  opacity: 0;
  animation: fadeIn 2s ease-in forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.light-text {
  
      letter-spacing: 0.2rem;
    }

    

</style>


<!-- 

.light-text {
  animation: fadeOutText 4s linear forwards;
  animation-delay: 4s; /* Delay fade-out until text is fully revealed */
}

@keyframes fadeOutText {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* Fade-In for Second Text */
.fade-in {
  opacity: 0;
  animation: fadeIn 2s ease-in forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}-->