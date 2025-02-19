/**
 * An array of public routes that do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/profile/setup', '/auth/error']

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to the DEFAULT_LOGIN_REDIRECT
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register']

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default route to redirect to after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'
