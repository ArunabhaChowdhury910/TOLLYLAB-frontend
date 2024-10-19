// import axios from 'axios';

// export default defineNuxtPlugin((nuxtApp) => {
//   const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
//   const googleClientId = '556631311351-1h9d3udkib410fi1cjdloi54ckf3ou43.apps.googleusercontent.com';
//   const redirectUri = 'http://localhost:3000/auth/callback';
//   const tokenEndpoint = 'http://localhost:8000/dj-rest-auth/google/';
//   const userInfoEndpoint = 'http://localhost:8000/dj-rest-auth/user/';

//   // Function to initiate Google OAuth login
//   function loginWithGoogle() {
//     const googleLoginUrl = `${googleAuthUrl}?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
//     window.location.href = googleLoginUrl;  // Redirect to Google's OAuth consent screen
//   }

//   // Function to handle the callback
//   async function handleGoogleCallback(code: string) {
//     try {
//       const tokenResponse = await axios.post(tokenEndpoint, {
//         code,
//         redirect_uri: redirectUri,
//         client_id: googleClientId,
//         grant_type: 'authorization_code',
//       });

//       const accessToken = tokenResponse.data.access_token;

//       // Fetch user info
//       const userResponse = await axios.get(userInfoEndpoint, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       const user = userResponse.data;
//       // Store user in state or cookies
//       console.log('Logged in user:', user);
//       return user;
//     } catch (error) {
//       console.error('Error during Google OAuth:', error);
//       throw error;
//     }
//   }

//   // Provide these methods globally in the app
//   return {
//     provide: {
//       googleAuth: {
//         loginWithGoogle,
//         handleGoogleCallback,
//       },
//     },
//   };
// });


import axios from 'axios';
import { useAuthStore } from '~/store/useAuthStore';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore(); 

  const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const googleClientId = '556631311351-1h9d3udkib410fi1cjdloi54ckf3ou43.apps.googleusercontent.com';
  const redirectUri = 'http://localhost:3000/auth/callback';
//   const tokenEndpoint = 'http://localhost:8000/dj-rest-auth/google/';
  const tokenEndpoint = 'http://localhost:8000/dj-rest-auth/google/';  // Correct endpoint for Google OAuth
  const userInfoEndpoint = 'http://localhost:8000/dj-rest-auth/user/';

  // Function to initiate Google OAuth login
  function loginWithGoogle() {
    const googleLoginUrl = `${googleAuthUrl}?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
    window.location.href = googleLoginUrl;
  }

  // Function to handle the callback
  async function handleGoogleCallback(code: string) {
    try {
      const tokenResponse = await axios.post(tokenEndpoint, {
        code,
        redirect_uri: redirectUri,
        client_id: googleClientId,
        grant_type: 'authorization_code',
      });

      const accessToken = tokenResponse.data.access_token;
      const refreshToken = tokenResponse.data.refresh_token || '';

      // Fetch user info
      const userResponse = await axios.get(userInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = userResponse.data;
      

      const email = user.email;  // Assuming the user object contains the email
      const username = user.username;

      authStore.storeLoginData(accessToken, refreshToken, username, email);
      console.log('Logged in user:', user);


      return user;
    } catch (error) {
      console.error('Error during Google OAuth:', error);
      authStore.setAuthError('Google OAuth login failed. Please try again.');

      throw error;
    }
  }

  // Provide these methods globally in the app
  return {
    provide: {
      googleAuth: {
        loginWithGoogle,
        handleGoogleCallback,
      },
    },
  };
});