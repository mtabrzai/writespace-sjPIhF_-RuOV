/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user
 * @property {string} username - Username of the user
 * @property {string} email - Email address of the user
 * @property {string} [avatar] - Optional avatar URL
 * @property {Date} createdAt - When the user account was created
 * @property {Date} updatedAt - When the user account was last updated
 */

/**
 * @typedef {Object} Post
 * @property {string} id - Unique identifier for the post
 * @property {string} title - Title of the post
 * @property {string} content - Content of the post
 * @property {string} authorId - ID of the user who authored the post
 * @property {Date} createdAt - When the post was created
 * @property {Date} updatedAt - When the post was last updated
 * @property {boolean} published - Whether the post is published
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user - Currently authenticated user or null
 * @property {string|null} token - Authentication token or null
 * @property {boolean} loading - Whether authentication is in progress
 * @property {string|null} error - Error message if authentication failed
 */