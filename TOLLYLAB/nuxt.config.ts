// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  

  app: {
    head: {
      script: [
        {src: 'https://checkout.razorpay.com/v1/checkout.js'}
      ]
    }
  },

  // Plugins to load before mounting the app
  plugins: [
    '~/plugins/jquery.js'
  ],

  runtimeConfig: {
    public: {

      axios: {
        baseURL: 'http://localhost:8000/api/' // Default API base URL
      },
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000/auth/callback',
      tokenEndpoint: process.env.TOKEN_ENDPOINT || 'http://localhost:8000/dj-rest-auth/google/',
      userInfoEndpoint: process.env.USER_INFO_ENDPOINT || 'http://localhost:8000/dj-rest-auth/user/',
    }

  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/motion/nuxt'],

  css: ["@/assets/style/main.css"],

  tailwindcss: {
    cssPath: "@/assets/style/main.css",
    config: {
      theme: {
        extend: {
          fontFamily: {
            Inter: ["Inter", "sans-serif"],
          },
          colors: {
            Red: "#FF0000",
            Red_half: "#FF000050",
            Primary_Black: "#0A0C10",
            Light_Black: "#424345",
            Yellow: "#f2cd30",
            Custom_grey: "#D9D9D930",
            Custom_grey_half: "#D9D9D950",
            Custom_white: "#D8D8D8",
            Light_grey: "#7D7E80",
            transparent_white: "#FFFFFF13",
            Grey: "#63636333",
            card_grey: "#8E8D8C",
            sample_grey: "#636363",
            black_font: "2E2F33",
          },
        },
      },
    },
  },
})