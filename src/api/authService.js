import axios from './axios';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.name - User's full name
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's password
   * @returns {Promise} API response
   */
  register: async (userData) => {
    const response = await axios.post('/api/auth/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password
    });
    return response.data;
  },

  /**
   * Login user
   * @param {Object} credentials - User login credentials
   * @param {string} credentials.email - User's email
   * @param {string} credentials.password - User's password
   * @returns {Promise} API response with token and user data
   */
  login: async (credentials) => {
    const response = await axios.post('/api/auth/login', {
      email: credentials.email,
      password: credentials.password
    });
    
    // Store token and user data
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    
    return response.data;
  },

  /**
   * Logout user
   * Clears token and user data from localStorage
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} Current user object or null
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Get current auth token
   * @returns {string|null} JWT token or null
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if token exists
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;
