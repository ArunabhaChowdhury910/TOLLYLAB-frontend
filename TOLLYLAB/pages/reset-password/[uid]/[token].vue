<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <div class="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form @submit.prevent="resetPassword">
          <input
            type="password"
            v-model="newPassword"
            placeholder="Enter new password"
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
            Reset Password
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
        newPassword: '',
        confirmPassword: '',
        message: '',
        error: ''
      };
    },
    methods: {
      async resetPassword() {
        if (this.newPassword !== this.confirmPassword) {
          this.error = 'Passwords do not match';
          return;
        }
  
        try {
          // Get uid and token from route params
          const { uid, token } = this.$route.params;
          // Make the API call to reset the password
          const response = await this.$axios.post(`/reset-password/${uid}/${token}/`, {
            new_password: this.newPassword,
            confirm_password: this.confirmPassword
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
  /* Custom styles for Reset Password page */
  </style>
  