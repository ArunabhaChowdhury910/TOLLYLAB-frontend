<template>
  <div class="flex pt-48  justify-center w-full">
    <footer class="w-full bg-transparent text-gray-400">
      <div class="container mx-auto px-6">
        <!-- Top Section: Logo, Links, and Button -->
        <div class="flex flex-col md:flex-row justify-between items-start mb-8">
          <!-- Logo -->
          <div class="mb-6 md:mb-0">
            <img src="/assets/images/logo.png" class="h-14" alt="Logo">
          </div>

          <!-- Links Section -->
          <div class="flex min-[425px]:space-x-12   text-left">
            <div v-for="(section, index) in linkSections" :key="index">
              <h4 class="text-Custom_white min-[425px]:text-md text-lg mb-4">{{ section.title }}</h4>
              <ul>
                <li
                  v-for="(link, i) in section.links"
                  :key="i"
                  class="mb-2 hover:text-Yellow text-lg"
                >
                  <a class="min-[425px]:text-xs" :href="link.url">{{ link.text }}</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Sign Up / Logout Button -->
          <div class="mt-6 md:mt-0">
            <button
              v-if="isLoggedIn"
              @click="logout"
              class="px-6 py-3 bg-Yellow text-white font-semibold rounded-md hover:bg-white hover:text-Yellow transition"
            >
              Logout
            </button>
            <button
              v-else
              class="px-6 py-3 bg-Yellow text-white font-semibold rounded-md hover:bg-white hover:text-Yellow transition"
            >
              Sign Up
            </button>
          </div>
        </div>

        <!-- Middle Section: Tagline and Social Media Icons -->
        <div class="  flex  justify-center text-center mb-8">
          <p class="mb-6 text-Light_grey">
            Say goodbye to interruptions and enjoy uninterrupted music streaming.
          </p>
          <div class="flex justify-center space-x-6">
            <a href="#" class="hover:text-white">
              <!-- Social Media Icon -->
            </a>
            <!-- Add more social media icons here -->
          </div>
        </div>

        <!-- Bottom Section: Legal Links -->
        <div class="border-t text-Light_grey border-gray-700 pt-6 text-sm text-center">
          <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
            <span>©2022 Pride</span>
            <a
              v-for="(legalLink, index) in legalLinks"
              :key="index"
              href="#"
              class="hover:text-white"
            >
              {{ legalLink }}
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isLoggedIn = ref(false);
const router = useRouter(); // Make sure this is correctly set up

onMounted(() => {
  // Check if the user is logged in by verifying if the JWT token exists in localStorage
  isLoggedIn.value = !!localStorage.getItem('access_token');
});

const logout = () => {
  // Remove tokens from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  
  // Redirect to the home page or login page
  alert("Logged out")
  router.push('/').then(() => {
    // Refresh the page after logout
    window.location.reload();
  }); // Ensure `router` is correctly initialized
  
  // Update the state to reflect the user is logged out
  isLoggedIn.value = false;
};
const linkSections = [
  {
    title: 'Get started',
    links: [
      { text: 'Download app', url: '#' },
      { text: 'New releases', url: '#' },
      { text: 'Originals', url: '#' },
      { text: 'Plans', url: '#' }
    ]
  },
  {
    title: 'Account',
    links: [
      { text: 'Sign in', url: '#' },
      { text: 'Platform', url: '#' },
      { text: 'Support', url: '#' }
      
    ]
  },
  {
    title: 'Musician',
    links: [
      { text: 'Partners', url: '#' },
      { text: 'Careers', url: '#' },
      { text: 'Press', url: '#' }
    ]
  }
];

const legalLinks = [
  'Cookie settings',
  'Terms and conditions',
  'Privacy policy',
  'Modern slavery statement'
];
</script>
