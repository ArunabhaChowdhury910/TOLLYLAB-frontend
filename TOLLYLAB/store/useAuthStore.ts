import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const userEmail = ref<string | null>(null);
  const userName = ref<string | null>(null);
  const authError = ref<string | null>(null); // Store for error messages

  // Store the login data (called from a page/component)
  const storeLoginData = (access: string, refresh: string, username: string, email: string) => {
    isAuthenticated.value = true;
    userEmail.value = email;
    userName.value = username;

    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user_email', email);
    localStorage.setItem('username', username);
  };


  const setAuthError = (message: string) => {
    authError.value = message;
  };


  const clearAuthError = () => {
    authError.value = null;
  };

  // Logout function
  const logout = async () => {
    try {
      isAuthenticated.value = false;
      userEmail.value = null;
      userName.value = null;

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_email');
      localStorage.removeItem('username');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const storeRefreshedAccessToken = (newAccessToken: string) => {
    localStorage.setItem('access_token', newAccessToken);
  };

  // Check if user is authenticated
  const checkAuthStatus = () => {
    const storedEmail = localStorage.getItem('user_email');
    const accessToken = localStorage.getItem('access_token');
    if (storedEmail && accessToken) {
      isAuthenticated.value = true;
      userEmail.value = storedEmail;
    } else {
      isAuthenticated.value = false;
      userEmail.value = null;
    }
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) {
      return logout(); // Log the user out if no refresh token exists
    }

    try {
      const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh });
      localStorage.setItem('access_token', response.data.access);
    } catch (error: any) {
      console.error('Token refresh error:', error);
      logout(); // Log the user out if the refresh fails
    }
  };

  return {
    isAuthenticated,
    userEmail,
    userName,
    authError,
    storeLoginData, // Store the login data
    logout,
    storeRefreshedAccessToken, 
    checkAuthStatus,
    refreshToken,
    setAuthError,
  };
});
