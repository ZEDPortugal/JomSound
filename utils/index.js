/**
 * Utility Functions
 * Helper functions for the JomSound application
 * @module utils
 */

// =============================================================================
// CLASS NAME UTILITIES
// =============================================================================

/**
 * Conditionally join class names together
 * @param  {...(string|Object|Array)} classes - Class names to join
 * @returns {string} Joined class names
 */
export const classNames = (...classes) => {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === 'string') return cls;
      if (Array.isArray(cls)) return classNames(...cls);
      if (typeof cls === 'object') {
        return Object.entries(cls)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
};

// =============================================================================
// THEME UTILITIES
// =============================================================================

/**
 * Get theme-specific class names
 * @param {boolean} isLight - Whether light mode is active
 * @param {string} lightClasses - Classes for light mode
 * @param {string} darkClasses - Classes for dark mode
 * @returns {string} Appropriate class names
 */
export const getThemeClasses = (isLight, lightClasses, darkClasses) => {
  return isLight ? lightClasses : darkClasses;
};

/**
 * Create a theme-aware style object
 * @param {boolean} isLight - Whether light mode is active
 * @param {Object} lightStyles - Styles for light mode
 * @param {Object} darkStyles - Styles for dark mode
 * @returns {Object} Merged style object
 */
export const getThemeStyles = (isLight, lightStyles, darkStyles) => {
  return isLight ? lightStyles : darkStyles;
};

// =============================================================================
// FORMATTING UTILITIES
// =============================================================================

/**
 * Format time in MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format percentage
 * @param {number} value - Value between 0 and 1
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value) => {
  return `${Math.round(value * 100)}%`;
};

// =============================================================================
// ANIMATION UTILITIES
// =============================================================================

/**
 * Get animation classes based on visibility
 * @param {boolean} isVisible - Whether element is visible
 * @param {string} enterClass - Class for entering animation
 * @param {string} exitClass - Class for exiting animation
 * @returns {string} Animation class
 */
export const getAnimationClass = (isVisible, enterClass, exitClass = 'opacity-0') => {
  return isVisible ? enterClass : exitClass;
};

/**
 * Create staggered animation delay
 * @param {number} index - Item index
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Object} Style object with animation delay
 */
export const getStaggerDelay = (index, baseDelay = 100) => {
  return { animationDelay: `${index * baseDelay}ms` };
};

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether phone number is valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

// =============================================================================
// STORAGE UTILITIES
// =============================================================================

/**
 * Safely get item from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Stored value or default
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Safely set item in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Whether operation succeeded
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

// =============================================================================
// DEBOUNCE & THROTTLE
// =============================================================================

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Throttle function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum time between calls in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// =============================================================================
// URL UTILITIES
// =============================================================================

/**
 * Create a URL-safe slug from text
 * @param {string} text - Text to convert
 * @returns {string} URL-safe slug
 */
export const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Check if URL is external
 * @param {string} url - URL to check
 * @returns {boolean} Whether URL is external
 */
export const isExternalUrl = (url) => {
  return url.startsWith('http://') || url.startsWith('https://');
};

export default {
  classNames,
  getThemeClasses,
  getThemeStyles,
  formatTime,
  formatPercentage,
  getAnimationClass,
  getStaggerDelay,
  isValidEmail,
  isValidPhone,
  getStorageItem,
  setStorageItem,
  debounce,
  throttle,
  createSlug,
  isExternalUrl,
};
