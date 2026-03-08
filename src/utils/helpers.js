/**
 * src/utils/helpers.js
 * General utility functions for the application.
 */

/**
 * Pauses execution for a specific amount of time.
 * Useful for staggering animations or simulating "thinking" time.
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generates a random integer between min and max (inclusive).
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * Crucial for Tarot card shuffling.
 * @param {Array} array 
 * @returns {Array} New shuffled array
 */
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Capitalizes the first letter of a string.
 * @param {string} string 
 * @returns {string}
 */
export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Triggers haptic feedback if supported by the device.
 * @param {number|Array<number>} pattern - Vibration pattern (e.g., 200 or [100, 50, 100])
 */
export const triggerHaptic = (pattern = 10) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

/**
 * Safely checks if the code is running in a browser environment.
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Generates a unique ID (simple implementation).
 * @returns {string}
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Formats a number to a currency string (if needed later).
 * @param {number} value 
 * @param {string} currency 
 * @returns {string}
 */
export const formatCurrency = (value, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(value);
};

/**
 * conditional class joining (simple version of clsx)
 * @param  {...any} classes 
 * @returns {string}
 */
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
