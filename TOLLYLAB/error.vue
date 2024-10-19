<template>
    <layout>
        <div>
            <img src="~/assets/images/ellipse.png" class="-z-10 left-0 top-24 absolute "/>
        </div>
        <div class="flex flex-col justify-center space-y-10 h-full pt-72 w-full ">
            <h1 class="text-center text-7xl">404 NOT FOUND </h1>
            <p class="text-center text-xs">Your visited page not found. You may go home page.</p>
            <div class="w-full flex justify-center">
                <nuxt-link class="w-fit text-center px-12 py-3 rounded-xl bg-Yellow hover:text-Yellow hover:bg-white " to="/">BACK TO HOME SCREEN</nuxt-link>

            </div>
        </div>
    </layout>
</template>

<script setup lang="ts">
 import layout from './layouts/default.vue'
</script>

<style scoped>

</style>