/**
 * Application-wide constants
 * @module constants
 */

/**
 * LocalStorage keys
 * @enum {string}
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'writespace:authToken',
  THEME: 'writespace:theme',
};

/**
 * Route paths
 * @enum {string}
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  POSTS: '/posts',
  POST: '/posts/:id',
  NEW_POST: '/posts/new',
  EDIT_POST: '/posts/:id/edit',
  PROFILE: '/profile',
};

/**
 * Theme options
 * @enum {string}
 */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

/**
 * API endpoints
 * @enum {string}
 */
export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
  POSTS: '/posts',
  USERS: '/users',
};

/**
 * Breakpoints for responsive design
 * @enum {string}
 */
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
};

/**
 * Default pagination values
 * @enum {number}
 */
export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  DEFAULT_PAGE: 1,
};