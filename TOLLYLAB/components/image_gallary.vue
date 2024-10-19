<template>
  <div class="container">
    <div class="gallery" ref="galleryRef">
      <div v-for="column in columns" :key="column.id" class="gallery-column">
        <div 
          v-for="(image, imageIndex) in column.images" 
          :key="image.id" 
          class="gallery-item"
          :class="{ 'landscape-large': isLastLandscape(column, imageIndex) }"
        >
          <img
            :src="image.url"
            :alt="`Gallery image`"
            :style="{
              width: '100%',
              height: 'auto'
            }"
            @click="openImage(image)"
            class="cursor-pointer"
          />
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="props.images.length > imagesToShow" class="flex justify-center mt-4">
      <button class="load-more-button hover:text-Yellow hover:bg-white bg-Yellow text-white" @click="loadMoreImages">Load More</button>
    </div>

    <!-- Image Pop-up -->
    <div v-if="selectedImage" class="image-popup" @click="closeImage">
      <div class="popup-content flex justify-center" @click.stop>
        <button v-if="hasPreviousImage" class="prev-button hover:text-Yellow -left-10" @click="showPreviousImage">&#8249;</button>
        <div class="flex flex-col">
          <img :src="selectedImage.url" :alt="'Full size image'" class="popup-image" />
          
          <div class="flex justify-center opacity-0 hover:opacity-100   h-full">
            
            <p v-if="selectedImage.description"  class="absolute  w-96 text-center  bottom-0 pt-8 h-1/6    px-2 " >  {{selectedImage.description}}  </p>

          </div>

        </div>
        <button v-if="hasNextImage" class="next-button hover:text-Yellow -right-10" @click="showNextImage">&#8250;</button>
        <button class="close-button" @click="closeImage">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  limit: {
    type: Number,
    default: Infinity
  }
});

const galleryRef = ref(null);
const selectedImageIndex = ref(null);
const columns = ref([]);
const columnCount = ref(4);
const imagesToShow = ref(8); // Initially show 8 images

// Computed property for displayed images
const displayedImages = computed(() => {
  return props.images.slice(0, Math.min(imagesToShow.value, props.limit));
});




// Distribute the images across columns based on imagesToShow
const distributeImages = () => {
  const newColumns = Array.from({ length: columnCount.value }, (_, i) => ({
    id: i,
    images: []
  }));

  displayedImages.value.forEach((image, index) => {
    const columnIndex = index % columnCount.value;
    newColumns[columnIndex].images.push({
      ...image,
      index: index, // Store the index
      isLandscape: image.width > image.height
    });
  });

  columns.value = newColumns;
};

// Handle window resize and adjust column count
const handleResize = () => {
  if (galleryRef.value) {
    const width = galleryRef.value.offsetWidth;
    if (width < 500) columnCount.value = 1;
    else if (width < 800) columnCount.value = 2;
    else if (width < 1100) columnCount.value = 3;
    else columnCount.value = 4;

    distributeImages();
  }
};

// Check if the image is the last landscape image in the last column
const isLastLandscape = (column, imageIndex) => {
  const isLastInColumn = imageIndex === column.images.length - 1;
  const isLastColumn = column.id === columns.value.length - 1;
  const isLandscape = column.images[imageIndex].isLandscape;
  return isLastInColumn && isLastColumn && isLandscape;
};

// Function to load more images (increment imagesToShow)
const loadMoreImages = () => {
  imagesToShow.value += 8; // Load 8 more images on each button click
  distributeImages();
};

const openImage = (image) => {
  selectedImageIndex.value = image.index;
  console.log('Selected image:', selectedImage.value); // Check what image is being opened
  console.log('Description:', selectedImage.value.description); // Check if description is present

};

const closeImage = () => {
  selectedImageIndex.value = null;
};

const selectedImage = computed(() => {
  return displayedImages.value[selectedImageIndex.value];
  
});

const hasPreviousImage = computed(() => selectedImageIndex.value > 0);
const hasNextImage = computed(() => selectedImageIndex.value < displayedImages.value.length - 1);

const showPreviousImage = () => {
  if (hasPreviousImage.value) {
    selectedImageIndex.value--;
  }
};

const showNextImage = () => {
  if (hasNextImage.value) {
    selectedImageIndex.value++;
  }
};

// Watch for changes in images and redistributes them
watch(() => props.images, () => {
  distributeImages();
}, { deep: true });

// Handle resizing and image distribution on component mount
onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  
});

// Clean up resize listener on component unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>


<style scoped>
.gallery {
  display: flex;
  gap: 10px;
}

.gallery-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.gallery-item {
  break-inside: avoid;
  margin-bottom: 10px;
}

.gallery-item img {
  display: block;
  width: 100%;
  height: auto;
}

.landscape-large {
  grid-column: span 2;
}

.image-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.popup-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.close-button {
  position: absolute;
  top: -40px;
  right: -40px;
  font-size: 30px;
  
  background: none;
  border: none;
  cursor: pointer;
}

.load-more-button {
  padding: 10px 20px;
  
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 50px;
  background: none;
  border: none;
  
  cursor: pointer;
  z-index: 1001;
}





@media (max-width: 1100px) {
  .landscape-large {
    grid-column: span 1;
  }
}
</style>
