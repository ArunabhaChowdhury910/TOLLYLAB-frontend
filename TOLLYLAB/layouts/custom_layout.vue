<template>
    <div class="flex flex-col min-h-screen">
        
      <navbar class=""/>
      <div>
        <div class="relative -z-20 w-full h-auto">
            <img src="~/assets/images/gradright.png" class=" left-0 absolute  top-52  h-auto rotate-180   "/>
            <img src="~/assets/images/gradright.png" class=" right-0 absolute top-52  h-auto   "/>
        </div>
        <slot/>
      </div>
      
      <footers ></footers>
      <div class="relative -z-20 w-full h-auto">
      <img src="/assets/images/downline.png" class="w-full absolute bottom-0 h-auto " />
    </div>
      
      
    </div>
  </template>
  
  <script setup>
  import navbar from '~/components/navbar/navbar.vue';
  import footers from '~/components/footer/footer.vue';
  
  </script>
  