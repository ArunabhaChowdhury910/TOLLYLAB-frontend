<template>
  <transition name="fade">
      <div v-if="isLoginModalVisible" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <img src="~/assets/images/Register.png" class="h-[450px] w-[200px] max-md:hidden rounded-2xl border-black absolute left-96 z-10 border-l"/>
          
          <div class="rounded-lg items-center w-7/12 min-h-[785px] justify-center absolute p-6 flex shadow-lg">
              <button @click="closeLoginModal" class="absolute top-32 right-10 border-2 rounded-full px-2 border-Custom_grey_half text-gray-500 z-50">
                  <span class="text-2xl hover:text-Red">&times;</span>
              </button>

              <div class="h-full md:pt-36 md:pb-36 md:p-6 md:pl-12 absolute md:-right-20 rounded-r-2xl flex w-full items-center">
                  <div class="border-black shadow-3xl md:bg-Custom_grey_half border w-[520px] md:px-24 md:ml-28 rounded-2xl h-[450px] py-4 flex flex-col justify-center">
                      <div class="w-full flex justify-center">
                          <h1 class="md:text-3xl text-2xl font-extralight text-Yellow items-center mb-8">LOGIN</h1>
                      </div>

                      <!-- Form Inputs -->
                      <input v-model="email" type="email" placeholder="Email" class="mb-4 w-full text-black p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-Yellow border-Light_grey" />
                      <input v-model="password" type="password" placeholder="Password" class="mb-4 w-full text-black p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-Yellow border-Light_grey" />
                      <p class="md:hidden text-Yellow text-right text-xs font-semibold" @click="openFPassModal">Forgot Password?</p>

                      <forgotpass :isForgotPassModalVisible="isForgotPassModalVisible" @close="closeForgotPassModal"></forgotpass>

                      <label class="flex items-center">
                          <input v-model="acceptTerms" type="checkbox" class="form-checkbox h-5 w-5 border-gray-400 rounded">
                          <span class="ml-2 mt-4 text-xs text-white">
                              By creating an account, I agree to our 
                              <a href="#" class="font-semibold underline underline-offset-1">Terms of Use</a> and 
                              <a href="#" class="font-semibold underline underline-offset-1">Privacy Policy</a>
                          </span>
                      </label>
                      <div v-if="!acceptTerms && submitted" class="text-red-500 text-sm mt-1">
                          You must accept the terms and conditions to proceed.
                      </div>

                      
                      <div class="w-full justify-center flex">
                          <button @click="loginUser" class="w-1/3 mt-8 bg-Light_grey text-black py-1 rounded-md bg-white hover:bg-Yellow hover:text-white mb-4">
                              Login
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </transition>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '~/store/useAuthStore';
import forgotpass from '~/components/forgotpassModal.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
      forgotpass
  },
  props: {
      isLoginModalVisible: {
          type: Boolean,
          required: true
      }
  },
  setup() {
      const router = useRouter();
      const authStore = useAuthStore();
      const isForgotPassModalVisible = ref(false); // Correct ref declaration

      const openFPassModal = () => {
          isForgotPassModalVisible.value = true; // Set to true when the Forgot Password button is clicked
          console.log('Forgot password modal opened:', isForgotPassModalVisible.value);
      };

      const closeForgotPassModal = () => {
          isForgotPassModalVisible.value = false; // Set to false to close modal
      };

      return {
          isForgotPassModalVisible, // Exposing this to the template
          router,
          authStore,
          openFPassModal,
          closeForgotPassModal
      };
  },
  data() {
      return {
          email: '',
          password: '',
          acceptTerms: false,
          submitted: false,
      };
  },
  methods: {
      closeLoginModal() {
          this.$emit('close');
      },
      async loginUser() {
          this.submitted = true;

          if (!this.acceptTerms) {
              return;
          }

          try {
              const response = await axios.post('http://localhost:8000/api/token/', {
                  username: this.email,
                  password: this.password
              });

              const { access, refresh, username } = response.data;
              this.authStore.storeLoginData(access, refresh, username, this.email);
              window.location.reload();
              this.closeLoginModal();
              this.$router.push('/');
          } catch (error) {
              console.error('Login failed:', error.response?.data || error.message);
              alert(`Login failed: ${error.response?.data?.detail || error.message}`);
          }
      }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
