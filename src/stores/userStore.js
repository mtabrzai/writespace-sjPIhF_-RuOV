import { create } from 'zustand';
import { API_ENDPOINTS } from '../constants';

/**
 * @typedef {import('../types').User} User
 */

/**
 * @typedef {Object} UserState
 * @property {User[]} users - List of users
 * @property {User|null} currentUser - Currently selected user
 * @property {boolean} loading - Whether users are being loaded
 * @property {string|null} error - Error message if loading failed
 * @property {number} page - Current page number
 * @property {number} limit - Number of users per page
 * @property {number} total - Total number of users
 * @property {boolean} hasMore - Whether there are more users to load
 */

/**
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<UserState>>}
 */
const useUserStore = create((set) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  total: 0,
  hasMore: false,

  /**
   * Fetch all users with pagination
   * @param {Object} [options]
   * @param {number} [options.page] - Page number
   * @param {number} [options.limit] - Number of users per page
   * @param {boolean} [options.replace] - Whether to replace existing users
   * @returns {Promise<void>}
   */
  fetchUsers: async (options = {}) => {
    const { page = 1, limit = 10, replace = false } = options;
    set({ loading: true, error: null });

    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USERS}?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch users');
      }

      const { users, total } = await response.json();
      set((state) => ({
        users: replace ? users : [...state.users, ...users],
        page,
        limit,
        total,
        hasMore: users.length === limit && state.users.length + users.length < total,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Fetch a single user by ID
   * @param {string} id - User ID
   * @returns {Promise<void>}
   */
  fetchUser: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USERS}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user');
      }

      const user = await response.json();
      set({ currentUser: user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Update an existing user
   * @param {string} id - User ID
   * @param {Object} userData - User data to update
   * @param {string} [userData.username] - Username
   * @param {string} [userData.email] - Email
   * @param {string} [userData.avatar] - Avatar URL
   * @returns {Promise<User>}
   */
  updateUser: async (id, userData) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USERS}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      const updatedUser = await response.json();
      set((state) => ({
        users: state.users.map(user => user.id === id ? updatedUser : user),
        currentUser: updatedUser,
        loading: false,
      }));
      return updatedUser;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Delete a user
   * @param {string} id - User ID
   * @returns {Promise<void>}
   */
  deleteUser: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USERS}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }

      set((state) => ({
        users: state.users.filter(user => user.id !== id),
        currentUser: state.currentUser?.id === id ? null : state.currentUser,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Clear error state
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Reset the store to initial state
   */
  reset: () => {
    set({
      users: [],
      currentUser: null,
      loading: false,
      error: null,
      page: 1,
      limit: 10,
      total: 0,
      hasMore: false,
    });
  },
}));

export default useUserStore;