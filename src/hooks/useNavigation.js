import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Custom hook for handling navigation within the app.
 * Provides wrappers around standard router navigation to allow
 * for future extensibility (analytics, transition sounds, etc.)
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Navigate to a specific route
   * @param {string} path - The path to navigate to
   * @param {object} state - Optional state to pass
   */
  const goTo = useCallback((path, state = {}) => {
    navigate(path, { state });
    window.scrollTo(0, 0); // Always scroll to top on new page
  }, [navigate]);

  /**
   * Go back to the previous screen
   */
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  /**
   * Replace the current screen (no history push)
   * Useful for redirects like Splash -> Home
   */
  const replace = useCallback((path) => {
    navigate(path, { replace: true });
    window.scrollTo(0, 0);
  }, [navigate]);

  return {
    goTo,
    goBack,
    replace,
    currentPath: location.pathname,
    state: location.state
  };
};

export default useNavigation;
