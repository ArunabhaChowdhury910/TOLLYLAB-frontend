<template>
    <div class="w-full  flex justify-center">
        <Image_gallary :images="imageDimensions"></Image_gallary>
        
    </div>
</template>

<script setup>
    import Image_gallary from '/components/image_gallary.vue'
    import axios from 'axios';

    const galleryImages = ref([]); // Store the fetched images
    const image_array = ref([]);  // Array to store all images
    const imageDimensions = ref([]);  
    onMounted(async () => {
  try {
    // Fetch images from the backend gallery API
    const response = await axios.get('http://localhost:8000/api/gallery/images/');
    
    // Assuming the response contains an array of image objects
    galleryImages.value = response.data;
    
    // Extract all images and store them in image_array
    galleryImages.value.forEach(image => {
      if (Array.isArray(image.image)) {
        // If image.image is an array, add all images to image_array
        image_array.value.push(...image.image);  // Spread and push all images
      } else {
        // If image.image is a single object, push it directly
        image_array.value.push(image.image);
      }
    });

    // After extracting the images, calculate their dimensions
    await calculateImageDimensions();  // Use async/await since it's an async function

    // Log the result
    console.log('Image dimensions:', imageDimensions.value);
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
  }
});

// Function to calculate the dimensions (width, height) of each image
async function calculateImageDimensions() {
  for (const imageUrl of image_array.value) {
    const dimensions = await getImageDimensions(imageUrl);  // Wait for each image's dimensions
    imageDimensions.value.push(dimensions);  // Push the dimensions to the reactive array
  }
}

// Helper function to get width and height of an image
function getImageDimensions(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;

    // On load, retrieve width and height
    img.onload = () => {
      resolve({
        url: url,
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };

    // In case of error loading the image
    img.onerror = () => {
      resolve({
        url: url,
        width: 0,
        height: 0,
        error: true
      });
    };
  });
}

    
</script>

<style lang="scss" scoped>

</style>