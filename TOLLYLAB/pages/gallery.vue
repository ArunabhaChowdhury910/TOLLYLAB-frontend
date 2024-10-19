<template>
    <section class="py-12 pt-48  bg-Primary_black text-white text-left relative">
      <!-- Main Heading -->
      <h2 class="pl-16 md:pl-48 text-4xl md:text-8xl font-bold leading-none tracking-tight">
        explore <br> FRAME COUNTER.
      </h2>
  
      <!-- Subheading -->
      <p class="pl-8 md:pl-48 text-base md:text-lg text-Light_grey pt-4 md:pt-6 pb-6 font-extralight">
        Explore <span class="font-semibold text-Light_grey">FRAME COUNTER</span>, our online image gallery. All these images were <br> developed and scanned at <span class="font-semibold text-Light_grey">TOLLYGRUNGE</span>.
      </p>
  
      <!-- Decorative Line Image -->
      <div>
            <img src="~/assets/images/left.png" class="-z-50 left-0 top-0  absolute "/>
            <img src="~/assets/images/right.png" class="-z-50 right-0 top-0  absolute "/>
        </div>
  
      <!-- Cards Container -->
      <div class="flex flex-col md:flex-row justify-around px-8 md:px-12 items-center space-y-6 pt-8 md:space-y-0">
        <div class="flex w-full justify-around space-x-6 mt-36 overflow-x-auto scroll-container overflow-y-hidden no-scrollbar lefttorightscroll">
          <!-- Auto-scrolling Film Cards -->
          
           <!-- <gal_contents :maxImages="9999"></gal_contents> -->
           <div class="w-4/5  flex justify-center">
        <Image_gallary :images="imageDimensions"></Image_gallary>
        
    </div>
        </div>
      </div>
    </section>
  </template>
  
  <!-- <script setup>
  import gal_contents from '~/components/gal_contents.vue';
  import { onMounted, ref } from 'vue';
  
  onMounted(() => {
    const scrollContainer = document.querySelector('.lefttorightscroll');
  
    function autoScroll() {
      const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const duration = 12000; // Total duration for the scroll (in milliseconds)
      const scrollStep = scrollWidth / (duration / 32); // Scroll step for approx. 60 FPS
  
      // Adjust scroll position
      scrollContainer.scrollLeft -= scrollStep;
  
      // Loop the scroll when it reaches the beginning
      if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft = scrollWidth;
      }
    }
  
    // Set interval for smooth scrolling
    const intervalId = setInterval(autoScroll, 32); // Approximately 60 FPS
  
    // Cleanup interval when the component is unmounted
    window.addEventListener('beforeunload', () => {
      clearInterval(intervalId);
    });
  });

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

    

  </script> -->


  <script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  import Image_gallary from '~/components/image_gallary.vue';
  
  const galleryImages = ref([]); // Store the fetched images
  const image_array = ref([]);  // Array to store all images and descriptions
  const imageDimensions = ref([]);  // Array for storing image dimensions, descriptions, and original width
  
  onMounted(async () => {
    try {
      // Fetch images from the backend gallery API
      const response = await axios.get('http://localhost:8000/api/gallery/images/');
      
      // Assuming the response contains an array of image objects
      galleryImages.value = response.data;
      
      // Extract all images and store them in image_array with their descriptions
      galleryImages.value.forEach(image => {
        if (Array.isArray(image.image)) {
          // If image.image is an array, add all images with their description
          image.image.forEach(img => {
            image_array.value.push({
              url: img,
              description: image.description // Assuming description is part of the API data
            });
          });
        } else {
          // If image.image is a single object, push it directly with description
          image_array.value.push({
            url: image.image,
            description: image.description
          });
        }
      });
  
      // After extracting the images, calculate their dimensions
      await calculateImageDimensions();  // Use async/await since it's an async function
  
      // Log the result
      console.log('Image dimensions, descriptions, and original width:', imageDimensions.value);
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
    }
  });
  
  // Function to calculate the dimensions (width, height) of each image
  async function calculateImageDimensions() {
    for (const image of image_array.value) {
      const dimensions = await getImageDimensions(image.url);  // Wait for each image's dimensions
      imageDimensions.value.push({
        ...dimensions,
        description: image.description, // Add the description
        originalWidth: dimensions.width // Add the original width (naturalWidth)
      });
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
          width: img.naturalWidth,  // Retrieve the original width (natural width)
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
  

  
  <style scoped>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  </style>
  