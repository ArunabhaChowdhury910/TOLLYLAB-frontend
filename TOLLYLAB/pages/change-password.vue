<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <div class="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4 text-center">Change Password</h2>
        <form @submit.prevent="changePassword">
          <input
            type="password"
            v-model="oldPassword"
            placeholder="Old password"
            required
            class="mb-4 w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500 border-gray-300"
          />
          <input
            type="password"
            v-model="newPassword"
            placeholder="New password"
            required
            class="mb-4 w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500 border-gray-300"
          />
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm new password"
            required
            class="mb-4 w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500 border-gray-300"
          />
          <button type="submit" class="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
            Change Password
          </button>
        </form>
        <div v-if="message" class="mt-4 text-center text-sm text-green-500">{{ message }}</div>
        <div v-if="error" class="mt-4 text-center text-sm text-red-500">{{ error }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        message: '',
        error: ''
      };
    },
    methods: {
      async changePassword() {
        if (this.newPassword !== this.confirmPassword) {
          this.error = 'Passwords do not match';
          return;
        }
  
        try {
          // Get the JWT token (assuming it's stored in localStorage)
          const token = localStorage.getItem('auth_token');
          // Make the API call to change the password
          const response = await this.$axios.post('/change-password/', {
            old_password: this.oldPassword,
            new_password: this.newPassword,
            confirm_password: this.confirmPassword
          }, {
            headers: {
              'Authorization': `Bearer ${token}` // Include JWT token
            }
          });
          this.message = response.data.message;
          this.error = '';
        } catch (error) {
          console.error(error);
          this.error = error.response?.data?.error || 'Something went wrong';
          this.message = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Custom styles for Change Password page */
  </style>
  