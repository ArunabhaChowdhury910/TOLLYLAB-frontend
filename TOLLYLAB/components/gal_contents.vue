<template>
  <div class="grid grid-cols-4 gap-4 w-3/5 sm:grid-cols-2 md:grid-cols-4">
    <div
      v-for="(image, index) in arrangedImages"
      :key="index"
      :class="getClass(image.orientation)"
    >
      <img
        class="object-cover object-center w-full h-40 max-w-full rounded-lg"
        :src="image.image"
        :alt="image.description || `Image ${index + 1}`"
        @load="setOrientation(index, $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const images = ref([]);
const arrangedImages = ref([]); // This will store the images in the correct grid order

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/gallery/images/');
    images.value = response.data.map(image => ({ ...image, orientation: '' }));

    // Wait for images to load and orientations to be set
    await new Promise(resolve => setTimeout(resolve, 500));

    arrangeImagesInGrid();
  } catch (error) {
    console.error('Failed to fetch images:', error);
  }
});

const setOrientation = (index, event) => {
  const img = event.target;
  const orientation = img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait';
  images.value[index].orientation = orientation;
};

const getClass = (orientation) => {
  return orientation === 'landscape'
    ? 'col-span-2' // Takes up more width for landscape images
    : 'col-span-1'; // Takes up less width for portrait images
};

const arrangeImagesInGrid = () => {
  let grid = [];
  let row = [];
  let remainingCols = 4;

  images.value.forEach(image => {
    const colSpan = image.orientation === 'landscape' ? 2 : 1;

    if (colSpan > remainingCols) {
      grid.push(...row);
      row = [];
      remainingCols = 4;
    }

    row.push(image);
    remainingCols -= colSpan;

    if (remainingCols === 0) {
      grid.push(...row);
      row = [];
      remainingCols = 4;
    }
  });

  // Push the last row if any images remain
  if (row.length) {
    grid.push(...row);
  }

  arrangedImages.value = grid;
};
</script>

<style scoped>
/* Ensure that images are displayed properly */
</style>
