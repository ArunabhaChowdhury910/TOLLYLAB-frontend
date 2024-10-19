<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <navbar />

    <!-- Content Area with gap -->
    <div class="flex-grow mt-40"> <!-- Adjust 'my-8' as needed -->
      <slot />
    </div>

    <!-- Footer -->
    <footers />
  </div>
</template>

<script setup>
import navbar from '~/components/navbar/navbar.vue';
import footers from '~/components/footer/footer.vue';
</script>
