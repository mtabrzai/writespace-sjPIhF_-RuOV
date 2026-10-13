import { create } from 'zustand';
import { API_ENDPOINTS, PAGINATION } from '../constants';

/**
 * @typedef {import('../types').Post} Post
 */

/**
 * @typedef {Object} PostState
 * @property {Post[]} posts - List of posts
 * @property {Post|null} currentPost - Currently selected post
 * @property {boolean} loading - Whether posts are being loaded
 * @property {string|null} error - Error message if loading failed
 * @property {number} page - Current page number
 * @property {number} limit - Number of posts per page
 * @property {number} total - Total number of posts
 * @property {boolean} hasMore - Whether there are more posts to load
 */

/**
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<PostState>>}
 */
const usePostStore = create((set) => ({
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  page: PAGINATION.DEFAULT_PAGE,
  limit: PAGINATION.DEFAULT_LIMIT,
  total: 0,
  hasMore: false,

  /**
   * Fetch all posts with pagination
   * @param {Object} [options]
   * @param {number} [options.page] - Page number
   * @param {number} [options.limit] - Number of posts per page
   * @param {boolean} [options.replace] - Whether to replace existing posts
   * @returns {Promise<void>}
   */
  fetchPosts: async (options = {}) => {
    const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT, replace = false } = options;
    set({ loading: true, error: null });

    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.POSTS}?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch posts');
      }

      const { posts, total } = await response.json();
      set((state) => ({
        posts: replace ? posts : [...state.posts, ...posts],
        page,
        limit,
        total,
        hasMore: posts.length === limit && state.posts.length + posts.length < total,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Fetch a single post by ID
   * @param {string} id - Post ID
   * @returns {Promise<void>}
   */
  fetchPost: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.POSTS}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch post');
      }

      const post = await response.json();
      set({ currentPost: post, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Create a new post
   * @param {Object} postData - Post data
   * @param {string} postData.title - Post title
   * @param {string} postData.content - Post content
   * @param {boolean} [postData.published=false] - Whether the post is published
   * @returns {Promise<Post>}
   */
  createPost: async (postData) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.POSTS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      const post = await response.json();
      set((state) => ({
        posts: [post, ...state.posts],
        loading: false,
      }));
      return post;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Update an existing post
   * @param {string} id - Post ID
   * @param {Object} postData - Post data to update
   * @param {string} [postData.title] - Post title
   * @param {string} [postData.content] - Post content
   * @param {boolean} [postData.published] - Whether the post is published
   * @returns {Promise<Post>}
   */
  updatePost: async (id, postData) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.POSTS}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }

      const updatedPost = await response.json();
      set((state) => ({
        posts: state.posts.map(post => post.id === id ? updatedPost : post),
        currentPost: updatedPost,
        loading: false,
      }));
      return updatedPost;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Delete a post
   * @param {string} id - Post ID
   * @returns {Promise<void>}
   */
  deletePost: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.POSTS}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete post');
      }

      set((state) => ({
        posts: state.posts.filter(post => post.id !== id),
        currentPost: state.currentPost?.id === id ? null : state.currentPost,
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
      posts: [],
      currentPost: null,
      loading: false,
      error: null,
      page: PAGINATION.DEFAULT_PAGE,
      limit: PAGINATION.DEFAULT_LIMIT,
      total: 0,
      hasMore: false,
    });
  },
}));

export default usePostStore;