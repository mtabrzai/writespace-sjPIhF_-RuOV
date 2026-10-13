import { create } from 'zustand';
import { STORAGE_KEYS } from '../constants';
import { API_ENDPOINTS } from '../constants';

/**
 * @typedef {import('../types').AuthState} AuthState
 * @typedef {import('../types').User} User
 */

/**
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<AuthState>>}
 */
const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || null,
  loading: false,
  error: null,

  /**
   * Login user with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const { user, token } = await response.json();
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      set({ user, token, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Register a new user
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  register: async (username, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const { user, token } = await response.json();
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      set({ user, token, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Fetch current user data
   * @returns {Promise<void>}
   */
  fetchMe: async () => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (!token) {
      set({ user: null, token: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.AUTH.ME}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          set({ user: null, token: null, loading: false });
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user');
      }

      const user = await response.json();
      set({ user, token, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Logout current user
   */
  logout: async () => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (!token) {
      set({ user: null, token: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      set({ user: null, token: null, loading: false });
    }
  },

  /**
   * Clear error state
   */
  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;