<template>
    <div class=" w-full h-full z-50 px-24">
        <div>
            <img src="~/assets/images/left.png" class="-z-10 left-0 top-0  absolute "/>
            <img src="~/assets/images/right.png" class="-z-10 right-0 top-0  absolute "/>
        </div>
       <div class="flex justify-center  z-10 w-full h-full pt-24">
        <div class="bg-transparent_white flex justify-center py-12 px-6 items-center rounded-2xl">
            <slideshow></slideshow>
        </div>
       </div>
       <div>
            <img src="~/assets/images/ellipse.png" class="-z-10 left-0 absolute "/>
       </div>
       <div>
           <div class="px-24 text-8xl pt-96 flex flex-col justify-center font-semibold">
                <h1 class="text-center">FILM PROCESSING <br/> AND SCANNING : <br/> BW / C41 / ECN2  </h1>
                <p class="text-lg text-center pt-14 text-Light_grey">Explore our range of TOLLYGRUNGE films.</p>   
           </div>
           <div class="pt-48 ">
                <div class="flex justify-start">
                    <div class="">
                        <img src="~/assets/images/gradline.png" class="-z-10 left-[500px] top-[500px] max-h-[2800px]   absolute "/>
                    </div>
                    <cartbox class="mt-8 pl-24"></cartbox>
                    <div class="w-11/12 pr-48 text-justify " >
                        <h3 class="">The CPB Darkroom now offers an easy-to-use mail order or drop-off service for Developing and scanning services for B&W, C41 and ECN2 film.
                            Please select from the dropdown menu to find the matching rates.</h3>
                        <h3 class="pt-12 ">
                            Prices include return shipping of the negatives once they have been processed and scanned (optional). 
                            Once you pay for your order please courier your rolls to the address mentioned below, please mark the Order No on the roll/envelope.<br/>
                            IMPORTANT - TURNAROUND TIME
                        </h3>
                        <h3 class="font-extralight">
                            The Darkroom team is excited to receive so many film rolls from across the country. The current turnaround time for development and scanning is a minimum of 10-15 working days from the time of receiving the rolls. We request your patience in this regard. You will receive your scans at the email address specified in the order. 
                        </h3>
                        <h3 class="pt-12">
                            Address to Courier Rolls
                            CPB Darkroom, 2/342A, First Cross Street, AGS Colony, Kotivakkam, Chennai - 600041. Mobile: +91-63861-35139

                        </h3>
                        <h3 class="pt-6">
                            The CPB Darkroom works with locally sourced lab-grade chemistry to mix its own formulations as per international standards. Limited stocks of name-brand chemistry are available from time to time and may be chosen from the selection menu. 
                            If you would like your film push or pull developed please select the appropriate option. If you have multiple rolls with varying instructions please finish your selection and add to the cart. You can then modify the options and continue adding more rolls to the cart as needed up to a maximum of 10 rolls per order.
                            We currently scan negatives on an Epson v800 flatbed scanner and will be upgrading to a DSLR scanning rig in due course. You can select from various resolutions for scanning.
                        </h3>
                    </div>
                </div>
                <img src="~/assets/images/stline.png" class="-z-10   left-0  absolute "/>
                
           </div>
       </div>

      
        
    </div>
    <div class=" pt-48  justify-around px-8  md:px-12 items-center space-y-6  md:space-y-0">
        <div class="flex  justify-around space-x-6 overflow-x-auto  w-full scroll-container overflow-y-hidden no-scrollbar lefttorightscroll">
          <!-- Auto-scrolling Film Cards -->
          
           <!-- <gal_contents></gal_contents> -->
           <div class="w-3/4   flex justify-center">
            <Image_gallary :images="imageDimensions" :limit="12"></Image_gallary>
        
    </div>
           
           
        </div>
        <div class="w-full  pt-24 flex justify-center">
          <nuxt-link
        to="/gallery"
        class=" px-10  py-2 bg-Yellow text-white font-semibold rounded-md hover:bg-white hover:text-Yellow transition"
      >
        See All
        </nuxt-link>
        </div>
      </div>
</template>

<script setup lang="ts">
    import cartbox from '~/components/cartbox.vue';
    import slideshow from '~/components/slideshow.vue';
    import { ref } from 'vue';


    import Image_gallary from '~/components/image_gallary.vue'
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

    

// State to track whether the image is expanded or not
const isExpanded = ref(false);

// Function to expand the image
const expandImage = () => {
  isExpanded.value = true;
};

// Function to close the expanded image
const closeImage = () => {
  isExpanded.value = false;
};


</script>

<style scoped>
.thumbnail {
 
  transition: transform 0.3s;
}

.thumbnail:hover {
  transform: scale(1.05);
}

.expanded-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  transition: transform 0.3s;
}

/* Translucent overlay */
.fixed {
  background: rgba(0, 0, 0, 0.8); /* Adjust the opacity for translucency */
}

/* For smooth expansion effect */
.fixed img {
  animation: zoomIn 0.3s;
}

@keyframes zoomIn {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}
</style>