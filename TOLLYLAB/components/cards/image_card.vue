<template>
    <div class="bg-transparent_white rounded-lg p-4 duration-300 ease-in-out hover:scale-110 shadow-lg w-64 cursor-pointer">
        Hello
    </div>
</template>

<script setup >



const props = defineProps({
  image: {
    type: Array,
    required: true
  }
});


onMounted(() => {

    console.log('this is card',image)
});

</script>

<style scoped>

</style>