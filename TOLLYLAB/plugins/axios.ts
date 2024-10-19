// plugins/axios.ts
import { defineNuxtPlugin } from '#app'
import axios from 'axios'
import type { AxiosInstance } from 'axios'  // Importing AxiosInstance as a type

// export default defineNuxtPlugin((nuxtApp) => {
//   const axiosInstance: AxiosInstance = axios.create({
//     baseURL: 'http://localhost:8000/api/',
//   })

//   // Optionally, you can add interceptors or other configurations here
//   axiosInstance.interceptors.request.use((config) => {
//     // Modify the request config if necessary
//     return config
//   })

//   // Set the axios instance globally
//   nuxtApp.provide('axios', axiosInstance)
// })

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    // Create an instance of Axios with the specified baseURL
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: config.public.axios.baseURL, // Update this to your API base URL
    });
  
    // Optionally, you can add interceptors or other configurations here
    axiosInstance.interceptors.request.use((config) => {
      // Modify the request config if necessary
      // Example: add authentication token to headers
      // config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    });
  
    // Set the axios instance globally
    nuxtApp.provide('axios', axiosInstance);
  });
