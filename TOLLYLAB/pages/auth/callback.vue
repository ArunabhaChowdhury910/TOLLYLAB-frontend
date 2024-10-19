<template>
    <div>
      <p>Processing Google login...</p>
    </div>
  </template>
  
  <script setup>
import { useRoute, useRouter } from 'vue-router';
const { $googleAuth } = useNuxtApp();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const code = route.query.code;
  if (code) {
    try {
      const user = await $googleAuth.handleGoogleCallback(code);  // Exchange code for token and get user data

      // Customize redirection based on user role or other conditions
      if (user.role === 'admin') {
        router.push('/');  // Redirect to admin dashboard if user is an admin
      } else {
        router.push('/');  // Redirect regular users to the dashboard
      }
      
    } catch (error) {
      console.error('Google OAuth failed:', error);
      router.push('/');  // Redirect back to login on failure
    }
  }
});
</script>

  