<template>
    <div class="flex flex-col justify-start items-center w-full ">
      <div class=" p-6 bg-transparent_white rounded-lg shadow-lg  h-1/2 text-white">
        <div class="border-b-2 border-Light_grey ">
            <h2 class="text-center font-bold pt-8 ">Please select from the following options.</h2>
            <div class="h-2">
        </div>

        </div>
        <div class="mb-4 pt-16 w-3/4 text-white">
            <h2 class="text-left font-bold ">Film Type.</h2>
          <Dropdown class=" pt-3 pb-6"></Dropdown>
        </div>
  
        <!-- Number of Films to be Processed -->
        <div class="mb-4 pt-3 flex justify-between items-center -z-10">
        <label class="text-sm font-medium">No. of films to be processed</label>
        <div class="flex bg-white rounded-2xl items-center space-x-2">
          <button @click="decrementContactSheets" class="bg-Grey border border-Primary_Black text-gray-500 rounded-full w-8 h-8 flex justify-center items-center">-</button>
          <span class="text-gray-500 font-semibold px-3 py-1">{{ contactSheets }}</span>
          <button @click="incrementContactSheets" class="border bg-Grey border-Primary_Black text-gray-500 rounded-full w-8 h-8 flex justify-center items-center">+</button>
        </div>
      </div>
  
        <!-- Number of Contact Sheets -->
        <div class="mb-6 pt-3 flex justify-between items-center">
          <label class="text-sm font-medium">No. of contact sheets</label>
          <div class="flex bg-white rounded-2xl items-center space-x-2">
          <button @click="decrementFilms" class="bg-Grey border border-Primary_Black text-gray-500 rounded-full w-8 h-8 flex justify-center items-center">-</button>
          <span class="text-gray-500 font-semibold px-3 py-1">{{ films }}</span>
          <button @click="incrementFilms" class="border bg-Grey border-Primary_Black text-gray-500 rounded-full w-8 h-8 flex justify-center items-center">+</button>
        </div>
        </div>
  
        <!-- Add to Cart Button -->
        
      </div>
      <div class="w-5/12 h-fit pt-20 ">
          <button
              class="w-full flex  justify-center bg-transparent_white  text-white font-bold py-3 text-center rounded-2xl shadow-lg hover:bg-yellow-400 transition"
            >
            <nuxt-link to="/checkout" class="bg-Yellow w-10/12 rounded-2xl px-8 py-3 text-center ">ADD TO CART</nuxt-link>
            </button>
      </div>
    </div>
    
  </template>
  
  <script setup>
  import Dropdown from './Dropdowncustom.vue';
  import { ref } from 'vue';
  

// Reactive state for the number of films and contact sheets
const films = ref(0);
const contactSheets = ref(0);

// Functions to increment and decrement the films and contact sheets
const incrementFilms = () => {
  films.value++;
};

const decrementFilms = () => {
  if (films.value > 0) films.value--;
};

const incrementContactSheets = () => {
  contactSheets.value++;
};

const decrementContactSheets = () => {
  if (contactSheets.value > 0) contactSheets.value--;
};
  </script>
  
  <style scoped>
  /* Additional styles if needed */
  </style>
  