/**
 * Custom Hooks
 * Reusable hook functions for the JomSound application
 * @module hooks
 */

import { useState, useEffect, useCallback } from 'react';

// =============================================================================
// useTheme - Theme management hook
// =============================================================================

/**
 * Hook for managing theme state (light/dark/system)
 * @param {string} initialMode - Initial theme mode ('light' | 'dark' | 'system')
 * @returns {Object} Theme state and handlers
 */
export const useTheme = (initialMode = 'system') => {
  const [themeMode, setThemeMode] = useState(initialMode);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const handleSystemThemeChange = (event) => {
      if (themeMode === 'system') {
        setIsLight(event.matches);
      }
    };

    // Set initial theme based on mode
    if (themeMode === 'system') {
      setIsLight(mediaQuery.matches);
    } else if (themeMode === 'light') {
      setIsLight(true);
    } else {
      setIsLight(false);
    }

    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [themeMode]);

  const handleThemeChange = useCallback((mode) => {
    setThemeMode(mode);
  }, []);

  return {
    themeMode,
    isLight,
    handleThemeChange,
  };
};

// =============================================================================
// useTypingEffect - Typewriter animation hook
// =============================================================================

/**
 * Hook for creating a typewriter effect
 * @param {string[]} words - Array of words to cycle through
 * @param {Object} options - Configuration options
 * @returns {Object} Current text and typing state
 */
export const useTypingEffect = (words, options = {}) => {
  const {
    typingSpeed = 100,
    deletingSpeed = 1,
    pauseDuration = 100,
  } = options;

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(typingSpeed - Math.random() * 100);

  useEffect(() => {
    const tick = () => {
      const currentIndex = loopNum % words.length;
      const fullText = words[currentIndex];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta(deletingSpeed);
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(pauseDuration);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(typingSpeed);
      }
    };

    const ticker = setInterval(tick, delta);

    return () => clearInterval(ticker);
  }, [text, delta, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseDuration]);

  return {
    text,
    isDeleting,
    isComplete: !isDeleting && text === words[loopNum % words.length],
  };
};

// =============================================================================
// useIntersectionObserver - Intersection observer hook
// =============================================================================

/**
 * Hook for observing element intersection with viewport
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} Ref and visibility state
 */
export const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = false,
    rootMargin = '0px',
  } = options;

  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(ref);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, threshold, triggerOnce, rootMargin]);

  return { ref: setRef, isVisible };
};

// =============================================================================
// useClickOutside - Click outside detection hook
// =============================================================================

/**
 * Hook for detecting clicks outside of an element
 * @param {Function} callback - Function to call when click outside is detected
 * @returns {Object} Ref to attach to the target element
 */
export const useClickOutside = (callback) => {
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const handleClickOutside = (event) => {
      if (ref && !ref.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);

  return { ref: setRef };
};

// =============================================================================
// useScrollToSection - Smooth scroll hook
// =============================================================================

/**
 * Hook for smooth scrolling to sections
 * @returns {Object} Scroll function and active section
 */
export const useScrollToSection = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = useCallback((sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      const top = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: top - (window.innerHeight / 1.2 - section.offsetHeight / 4),
        behavior: 'smooth',
      });
      setActiveSection(sectionId.replace('#', ''));
    }
  }, []);

  return {
    activeSection,
    setActiveSection,
    scrollToSection,
  };
};

// =============================================================================
// useMediaQuery - Media query hook
// =============================================================================

/**
 * Hook for responsive media queries
 * @param {string} query - CSS media query string
 * @returns {boolean} Whether the media query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

export default {
  useTheme,
  useTypingEffect,
  useIntersectionObserver,
  useClickOutside,
  useScrollToSection,
  useMediaQuery,
};
