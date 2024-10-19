<template>
    <div>
      <form @submit.prevent="loginUser">
        <div>
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="email"
            type="text"
            placeholder="Enter email"
            class="border p-2 text-black"
          />
        </div>
        <div>
          <label for="password">Password:</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="border p-2 text-black"
          />
        </div>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
  
      <div v-if="authStore.isAuthenticated" class="mt-4">
        Logged in as: {{ authStore.userEmail }}
      </div>
  
      <div v-if="authError" class="text-red-500 mt-4">
        Error: {{ authError }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { useAuthStore } from '~/store/useAuthStore';
  
  // Refs for the input fields
  const email = ref('');
  const password = ref('');
  
  // Access the auth store and router
  const authStore = useAuthStore();
  const router = useRouter();
  
  // Computed property to display any authentication error from the store
  const authError = computed(() => authStore.authError);
  
  // Function to handle login
  const loginUser = async () => {
    try {
        //console.log(email,password) email and password er modhhe value ache
      const response = await axios.post(
        'http://localhost:8000/api/token/', // Login endpoint
        {
          username: email.value,
          password: password.value,
        },
        // { withCredentials: true } // Allows cookies to be sent/received
      );
    
      console.log('response', response.data)
      // Call the store to save the login data
      const { access, refresh, username } = response.data;
      authStore.storeLoginData(access, refresh, username, email.value);
      console.log(access, refresh, username, email.value)
      
  
      // Redirect after login
      router.push('/');
    } catch (error) {
      if (error.response) {
        authStore.setAuthError('Login failed: Incorrect email or password.');
      } else {
        authStore.setAuthError('Login failed: Please try again later.');
      }
    }
  };
  
  // On mounted, clear any previous authentication error
  onMounted(() => {
    authStore.clearAuthError();
  });
  </script>
  
  <style scoped>
  form {
    max-width: 400px;
    margin: 0 auto;
  }
  
  input {
    width: 100%;
    margin-bottom: 10px;
  }
  
  button {
    width: 100%;
  }
  </style>
  