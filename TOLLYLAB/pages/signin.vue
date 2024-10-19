<template>
  <div>
    <div>
      <img src="assets/images/Ellipse.png" class="absolute top-8 -z-20" />
    </div>
    <div>
      <img src="assets/images/singinleft.png" class="absolute top-12 -z-20" />
      <img src="assets/images/singinleft.png" class="rotate-180 absolute top-12 right-0 -z-20" />
    </div>
    <div class="w-full  h-full mt-20 flex justify-center">
      <div class="bg-Custom_grey_half space-y-8 px-24 py-12 rounded-2xl">
        <div class="flex justify-center">
          <h2 class="text-Yellow font-bold text-2xl">CREATE ACCOUNT</h2>
        </div>
        <div class="grid grid-cols-2 gap-x-8 gap-y-6">
          <input
            v-model="first_name"
            type="text"
            placeholder="Enter Name"
            class="mb-4 w-full text-black p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-Yellow border-Light_grey"
          />
          <input
            v-model="last_name"
            type="text"
            placeholder="Enter last name"
            class="mb-4 w-full text-black p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-Yellow border-Light_grey"
          />
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full mb-4 text-black p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-Yellow border-Light_grey"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Enter Password"
            class="mb-4 w-full col-span-2 text-black p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-Yellow border-Light_grey"
          />
          <input
            v-model="confirm_password"
            type="password"
            placeholder="Confirm password"
            class="mb-4 w-full col-span-2 text-black p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-Yellow border-Light_grey"
          />
        </div>
        <div class="flex justify-end">
          <button @click="register" class="w-1/3 px-4 py-3 bg-Yellow rounded-full hover:bg-white hover:text-Yellow text-center">
            Register
          </button>
        </div>
        <div class="flex space-x-2 items-center">
          <p class="text-white text-xs">Already have an account?</p>
          <button
            @click="openLoginModal"
            class="flex items-center px-4 py-1 border border-gray-300 hover:text-white rounded-full hover:bg-Yellow focus:outline-none"
          >
            <span class="text-Primary_Black text-xs font-semibold text-Yellow hover:text-white">Sign in</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <LoginModal :isLoginModalVisible="isLoginModalVisible" @close="closeLoginModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Define reactive variables
const first_name = ref('');
const last_name = ref('');
const email = ref('');
const password = ref('');
const confirm_password = ref('');
const isLoginModalVisible = ref(false);
const loginEmail = ref('');
const loginPassword = ref('');
const router = useRouter();

// Registration function
const register = async () => {
  if (password.value !== confirm_password.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post('http://localhost:8000/api/register/', {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
    });

    console.log('Registration successful', response.data);

    // Show the login modal after successful registration
    openLoginModal();
  } catch (error) {
    if (error.response) {
      console.error('Registration failed:', error.response.data);
      alert(`Registration failed: ${error.response.data.error || error.response.statusText}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      alert('Registration failed: No response received from the server.');
    } else {
      console.error('Error setting up the request:', error.message);
      alert(`Registration failed: ${error.message}`);
    }
  }
};

// Login function
const loginUser = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/login/', // Replace with your actual login endpoint
      {
        email: loginEmail.value,
        password: loginPassword.value,
      },
      { withCredentials: true } // This ensures cookies (like JWT tokens) are included in the request
    );

    // You don't need to store the token locally if you're using HTTP-only cookies
    console.log('Login successful:', response.data);

    // Redirect to the main page after successful login
    router.push('/');
  } catch (error) {
    if (error.response) {
      console.error('Login failed:', error.response.data);
      alert(`Login failed: ${error.response.data.error || error.response.statusText}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      alert('Login failed: No response received from the server.');
    } else {
      console.error('Error setting up the request:', error.message);
      alert(`Login failed: ${error.message}`);
    }
  }
};

// Function to open login modal
const openLoginModal = () => {
  isLoginModalVisible.value = true;
};

// Function to close login modal
const closeLoginModal = () => {
  isLoginModalVisible.value = false;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
