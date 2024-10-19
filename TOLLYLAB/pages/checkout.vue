<template>
  <div class="container mx-auto px-4">
    <h2 class="font-bold text-6xl text-center pb-24">CHECKOUT</h2>
    <img src="~/assets/images/center.png" class="-z-50 left-1/4 -top-48 h-[120rem] absolute" />

    <div class="flex flex-wrap justify-center space-x-8 text-white">
      <div class="w-5/12 mb-8 lg:mb-0">
        <div class="space-y-4">
          <!-- Personal Information Section -->
          <div class="bg-Custom_grey p-4 rounded-xl shadow-md">
            <h2 class="text-lg mb-4 pb-2 border-b">Personal Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="relative">
                <input v-model="name"  type="text" placeholder="Your Name" required class="rounded-full bg-Light_grey col-span-2 p-2 placeholder:pl-4 placeholder:text-white"  :class="{'border-red-500': !name && showErrors}"/>
                <p v-if="nameError && !name" class="text-red-500 text-sm mt-1">Please fill out this fields correctly</p>
              </div>
              <div class="relative">
                <input v-model="email" type="email" placeholder="Email" required class="rounded-full bg-Light_grey p-2 placeholder:pl-4 placeholder:text-white"/>
                <p v-if="emailError " class="text-red-500 text-sm mt-1">Please fill out this fields correctly</p>
              </div>
              <div class="relaive">
                <input v-model="phone"  type="text" placeholder="Phone Number" pattern="[0-9]{10}" required class="rounded-full bg-Light_grey p-2 placeholder:pl-4 placeholder:text-white"/>
                <p v-if="phoneError " class="text-red-500 text-sm mt-1">Please fill out this fields correctly</p>
                <!-- <p v-if="phonelen && !phone" class="text-red-500 text-sm mt-1">Please fill out this field</p> -->
              </div>
            </div>
          </div>

          <!-- Shipping Address Section -->
          <div class="bg-Custom_grey p-4 rounded-xl shadow-md">
            <h2 class="text-lg mb-4 pb-2 border-b">Shipping Address</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="relative"> 
                <input type="text"  v-model="address" placeholder="Address" required class="rounded-full bg-Light_grey p-2 placeholder:pl-4 placeholder:text-white"/>
                <p v-if="addressError" class="text-red-500 text-sm mt-1">Please fill out this fields correctly</p>
              </div>
              <div class="relative"> 
                <input type="text"  v-model="postalCode" placeholder="Postal Code" required pattern="[0-9]{6}"  class="rounded-full bg-Light_grey p-2 placeholder:pl-4 placeholder:text-white"/>
                <p v-if="postalError " class="text-red-500 text-sm mt-1">Please fill out this fields correctly</p>
                <!-- <p v-if="postlen && !name" class="text-red-500 text-sm mt-1">Please fill out this field</p> -->
              </div>
              <div class="relative">
                <input type="text" v-model="city" placeholder="City" required class="rounded-full bg-Light_grey p-2 placeholder:pl-4 placeholder:text-white"/>
                <p v-if="cityError " class="text-red-500 text-sm mt-1">Please fill out this fields correctly</p>
              </div>
              <div class="relative">
                <input type="text"  v-model="country" placeholder="Country" required class="rounded-full bg-Light_grey p-2 placeholder:pl-4 placeholder:text-white"/>
                <p v-if="CountryError " class="text-red-500 text-sm mt-1">Please fill out this fields correctly</p>
              </div>
            </div>
          </div>

          <!-- Voucher Section -->
          <!-- <div class="bg-Custom_grey p-4 rounded-md shadow-md">
            <h2 class="font-bold text-lg mb-4 pb-2 border-b">Voucher</h2>
            <Dropdowncustom></Dropdowncustom>
          </div> -->

          <!-- Payment Methods Section -->
          <!-- <div class="bg-Custom_grey p-4 rounded-md shadow-md">
            <h2 class="font-bold text-lg mb-4 pb-2 border-b">Payment Methods</h2>
            <div class="flex items-center space-x-4">
              <label><input type="radio" name="payment" class="mr-2"/> Cash On Delivery</label>
              <label class="text-Yellow"><input type="radio" name="payment" class="mr-2"/> Credit or Debit</label>
            </div>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Cardholder Name" class="rounded-full bg-Light_grey p-2 col-span-2 placeholder:pl-4 placeholder:text-white"/>
              <input type="text" placeholder="Card Number" class="rounded-full bg-Light_grey p-2 col-span-2 placeholder:pl-4 placeholder:text-white"/>
              <input type="text" placeholder="Exp Date" class="rounded-full bg-Light_grey p-2 placeholder:pl-4 placeholder:text-white"/>
              <input type="text" placeholder="CVC number" class="rounded-full bg-Light_grey p-2 placeholder:pl-4 placeholder:text-white"/>
            </div>
          </div> -->
        </div>
      </div>

      <!-- Order Summary Section -->
      <div class="w-4/12 h-fit  bg-gray-200 text-gray-900 p-6 rounded-lg shadow-md">
        <h2 class="font-semibold text-3xl mb-4 pb-2 border-b border-black">Item</h2>
        <div class="space-y-2">
          <!-- Dynamically Render Product from Session -->
          <div v-if="product.id" class="flex items-center justify-between space-x-4 border-black pb-2  border-b">
            <div class="flex items-center">
              <checkout_card :image="product.image"></checkout_card>
              <div class="pl-6 text-Primary_Black">
                <p class="font-bold">{{ product.name }}</p>
                <p class="text-xs pt-1 font-extralight">{{ product.description }}</p>
                <nuxt-link to="/product" class="text-sm pt-3 flex items-center text-Primary_Black hover:text-Red cursor-pointer" @click="removeProduct">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 15 15">
                      <path fill="currentColor" fill-rule="evenodd" d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z" clip-rule="evenodd"/>
                    </svg>
                  </span> 
                  Remove
                </nuxt-link>
              </div>
            </div>
            <div>
              <p>Rs. {{ product.price }}</p>
            </div>
          </div>

          <!-- Pricing Summary -->
          <hr class="mt-2"/>
          <div class="space-y-1 border-black pb-2 border-b">
            <div class="flex justify-between">
              <p>Subtotal </p>
              <p>Rs. {{ subtotal }}.00</p>
            </div>
            <div class="flex justify-between">
              <p>Discount</p>
              <p>Rs. 0.00</p>
            </div>
            <div class="flex justify-between">
              <p>Shipping</p>
              <p>Rs. 20.00</p>
            </div>
          </div>

          <!-- Total Summary -->
          <hr class="mt-2"/>
          <div class="flex justify-between font-bold">
            <p>Total</p>
            <p>Rs. {{ totalPrice }}.00</p>
          </div>
          <button @click="buyNow" class="mt-4 w-full bg-Yellow text-white py-2 rounded-3xl hover:bg-white hover:text-Yellow hover:border-Red hover:border">
            <span v-if="!loading">Checkout</span>
            <span v-if="loading">Processing...</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Dropdowncustom from '~/components/Dropdowncustom.vue';
import checkout_card from '~/components/cards/checkout_card.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useProductStore } from '~/store/useProductStore';
import Razorpay from 'razorpay'; 
import { useRouter } from 'vue-router'; // Import the router

const router = useRouter(); // Initialize the router

const productStore = useProductStore();

const product = ref({});

const showErrors = ref(false);
const nameError = ref(false);
const emailError = ref(false);
const phoneError = ref(false);
const addressError = ref(false);
const postalError = ref(false);
const cityError = ref(false);
const CountryError = ref(false);
const phonelen = ref (false);
const postlen = ref(false);




onMounted(() => {
  // Load product from localStorage on component mount
  productStore.loadProductFromLocalStorage();
  product.value = productStore.product;
  // console.log('totalPrice', totalPrice.value)
});

const subtotal = computed(() => (product.value.price * product.value.quantity) || 0);

const totalPrice = computed(() => subtotal.value + 20);

const name = ref('');
const email = ref('');
const phone = ref('');
const address = ref('');
const postalCode = ref('');
const city = ref('');
const country = ref('');

const loading = ref(false);




const buyNow = async () => {
  
  // showErrors.value = true;
  if (!name.value || !email.value || !phone.value || !address.value || !postalCode.value || !city.value || !country.value || phone.value.length !== 10 ||postalCode.value.length !== 6 ) {
    alert("Please fill in all required fields correctly.");
    // if (!name.value ){
    //   nameError.value = true;
    // }
    // if(!email.value ){
    //   emailError.value = true;
    // }
    // if(!phone.value ){
    //   phoneError.value = true;
    // }
    // if (phone.length !== 10 ){
    //   phonelen.value = true;
    // }
    
    // if (!address.value){
    //   addressError.value = true;
    // }
    // if(!postalCode.value){
    //   postalError.value = true;
    // }
    // if(postalCode.length !== 6){
    //   postlen.value = true;
    // }
    // if (!city.value){
    //   cityError.value= true;
    // }
    // if (!country.value){
    //   CountryError.value = true;
    // }\
    nameError.value = !name.value;
    emailError.value = !email.value;
    phoneError.value = !phone.value || phone.value.length !== 10;  // Check if phone is exactly 10 digits
    addressError.value = !address.value;
    postalError.value = !postalCode.value || postalCode.value.length !== 6;  // Check if postal code is exactly 6 digits
    cityError.value = !city.value;
    CountryError.value = !country.value;

    return;
  }


  loading.value = true;
  
  const productName = product.value.name;
  const productPrice = product.value.price;
  const quantity = product.value.quantity;

  try {



    // Create an order on your backend
    // working till here
    const orderResponse = await axios.post('http://localhost:8000/api/create-order/', {
      amount: Math.round(totalPrice.value * 100), // amount in paise
      product_name: product.value.name,
      quantity: product.value.quantity,
      customer_name: name.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      postal_code: postalCode.value,
      city: city.value,
      country: country.value,
    });
    
    // console.log(orderResponse.data.order_id);



    const options = {
      key: "rzp_test_nLFBzzSVRJQbl4", // Replace with your actual Razorpay Key ID
      amount: orderResponse.data.amount,
      currency: "INR",
      name: "TOLLYLAB",
      description: `Payment for ${product.value.name}`,
      order_id: orderResponse.data.order_id,
      
      handler: async function (response) {
        // Handle the success callback
        console.log("Razorpay response:", response); 
        const result = await axios.post('http://localhost:8000/api/payment-success/', {
          ...response,
          product_name: product.value.name,
          product_price: product.value.price,
          quantity: product.value.quantity,
          shipping_address: `${address.value}, ${postalCode.value}, ${city.value}, ${country.value}`,
          customer_name: name.value,
          email: email.value,
          phone: phone.value,
        });
        console.log('this is try', result.data.status)
        if (result.data.status === 'success') {
          alert('Payment Successful order is placed');
          router.push('/');
          // You can redirect to a success page or update UI here
        }
        else{
          console.log('payment failure')
        }
      },
      prefill: {
        name: name.value,
        email: email.value,
        contact: phone.value
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    



    
  } catch (error) {
    console.error('Payment initiation failed:', error);
    alert('Payment initiation failed. Please try again.');
     
    
  } finally {
    loading.value = false;
  }
};

const removeProduct = () => {
  productStore.removeProduct();
  product.value = {};
};

</script>


<style scoped>

</style>