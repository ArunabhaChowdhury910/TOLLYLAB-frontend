<template>
    <div class="relative w-full z-50">
      <!-- Trigger Button -->
      <button
        @click="isOpen = !isOpen"
        class="w-full bg-sample_grey text-Custom_white py-2 px-4 rounded-2xl border  border-gray-600"
      >
        {{ selectedOption }}
        <span class="float-right">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="m7 10l5 5l5-5z"/></svg>
        </span> <!-- Down arrow icon -->
      </button>
      
      <!-- Dropdown Options -->
      <div
        v-if="isOpen"
        class=" left-0 w-full bg-sample_grey absolute rounded shadow-lg z-50"
      >
        <ul class="text-Custom_white ">
          <li
            v-for="(option, index) in options"
            :key="index"
            @click="selectOption(option)"
            class="px-4 py-2 hover:bg-Red text-Custom_white cursor-pointer"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // State variables
  const isOpen = ref(false);
  const selectedOption = ref('Please Select One');
  const options = ref(['Color Negative', 'Black & White', 'Slide Film']);
  
  // Function to handle option selection
  function selectOption(option) {
    selectedOption.value = option;
    isOpen.value = false;
  }
  </script>
  
  <style scoped>
  /* Optionally style the dropdown further here */
  </style>
  