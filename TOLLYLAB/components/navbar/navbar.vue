<template>
  <nav class="fixed w-full z-50 bg-Primary_Black text-sm font-extralight">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      
      <!-- Logo Section -->
      <a href="/" class="flex items-center space-x-3">
        <img src="/assets/images/logo.png" class="h-14" alt="TOLLYLAB Logo">
      </a>

      <!-- Hamburger Icon for Mobile -->
      

      <!-- Right Section (Login and Signup Buttons) -->
      <div class="flex md:order-2 space-x-6">
        <template v-if="isLoggedIn">
          <!-- If logged in, show these icons -->
          <img src="/assets/images/cart-icon.png" class="h-8 w-8 cursor-pointer" alt="Cart">
          <img src="/assets/images/profile-icon.png" class="h-8 w-8 cursor-pointer rounded-full bg-Yellow" alt="Profile">
        </template>
        <template v-else >
          <!-- If not logged in, show login and signup buttons -->
           

          <button
            type="button"
            class="text-white max-[426px]:hidden hover:text-Yellow font-xs rounded-lg px-4 py-2"
            @click="openLoginModal"
          >
            LogIn
          </button>
          <nuxt-link
            type="button"
            class="text-white max-[426px]:hidden hover:text-Yellow cursor-pointer font-xs bg-Custom_grey rounded-lg px-4 py-2.5"
            to="/signin"
          >
            SignUp
          </nuxt-link>
        </template>
        <button 
        @click="toggleMobileMenu" 
        class="inline-flex items-center p-2 text-white rounded-lg md:hidden focus:outline-none"
        aria-controls="mobile-menu" 
        aria-expanded="false"
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18H3v-2h18v2Zm0-5H3v-2h18v2Zm0-5H3V6h18v2Z" class="text-Yellow hover:text-white"/></svg>
      </button>
      </div>

      <!-- Navbar Links (Hidden on Mobile) -->
      <div
        id="desktop-menu"
        class="hidden md:flex items-center justify-between rounded-2xl bg-Custom_grey px-8 py-1 md:w-auto md:order-1"
      >
        <ul class="flex flex-col md:flex-row md:space-x-8">
          <li><a href="/" class="block py-2 px-3 text-white hover:text-Yellow">Home</a></li>
          <li><a href="#" class="block py-2 px-3 text-white hover:text-Yellow">Darkroom</a></li>
          <li><a href="/gallery" class="block py-2 px-3 text-white hover:text-Yellow">FrameCounter</a></li>
          <li><a href="/product" class="block py-2 px-3 text-white hover:text-Yellow">Shopnow</a></li>
        </ul>
      </div>
    </div>

    <!-- Mobile Menu (Toggled) -->
    <div 
      id="mobile-menu" 
      class="md:hidden" 
      v-if="isMobileMenuOpen"
    >
      <ul class="space-y-2 px-4 w-full py-2 bg-Custom_grey fixed">
        <li><a href="/" class="block py-2 px-3 text-white hover:text-Yellow">Home</a></li>
        <li><a href="#" class="block py-2 px-3 text-white hover:text-Yellow">Darkroom</a></li>
        <li><a href="/gallery" class="block py-2 px-3 text-white hover:text-Yellow">FrameCounter</a></li>
        <li><a href="/product" class="block py-2 px-3 text-white hover:text-Yellow">Shopnow</a></li>
        <li><a href="/signup" class="block py-2 px-3 text-white hover:text-Yellow">SignUp</a></li>
        <li> <button
            type="button"
            class="block py-2 px-3 text-white hover:text-Yellow "
            @click="openLoginModal"
          >
            LogIn
          </button></li>
      </ul>
    </div>

    <!-- Decorative Line -->
    <img
      src="/assets/images/black_line.png"
      alt="Decorative Line"
      class="absolute top-6 left-0 w-full h-auto -z-10"
    />

    <!-- Include LoginModal component -->
    <LoginModal
      :isLoginModalVisible="isLoginModalVisible"
      @close="closeLoginModal"
    />
  </nav>
</template>


<script setup>

import { ref, computed, onMounted } from 'vue';
import LoginModal from '~/components/LoginModal.vue';
import { useAuthStore } from '~/store/useAuthStore'; //

// Create a reference for login modal visibility
const isLoginModalVisible = ref(false); // Set to false initially

const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isAuthenticated);

const isMobileMenuOpen = ref(false); 

// Open the login modal
const openLoginModal = () => {
  isLoginModalVisible.value = true; // Set to true when login button is clicked
  console.log('login clicked', isLoginModalVisible.value)
};

// Close the login modal
const closeLoginModal = () => {
  isLoginModalVisible.value = false; // Set to false to close modal
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};



onMounted(() => {
  // Ensure the user's auth status is checked when the component is mounted
  authStore.checkAuthStatus(); // Check the auth status on page load
});

</script>

<style scoped>
/* Add any styles you need */
</style>
