import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AppContext = createContext(undefined);

/**
 * AppProvider Component
 * Wraps the application to provide global state management.
 */
export const AppProvider = ({ children }) => {
  // Global loading state for API calls or heavy processing
  const [isLoading, setIsLoading] = useState(false);
  
  // Global error state for displaying error boundaries or toasts
  const [globalError, setGlobalError] = useState(null);
  
  // App initialization state (e.g., checking local storage, auth, etc.)
  const [isInitialized, setIsInitialized] = useState(false);

  // Theme mode (even though we are dark-first, structure allows future toggling)
  const [themeMode, setThemeMode] = useState('dark');

  useEffect(() => {
    // Simulate initial app hydration check
    const initializeApp = async () => {
      try {
        // Here we would check for stored sessions, valid tokens, etc.
        // For this PWA, we ensure local storage is accessible
        setIsInitialized(true);
      } catch (error) {
        console.error("App initialization failed:", error);
        setGlobalError("Failed to initialize application resources.");
      }
    };

    initializeApp();
  }, []);

  // Helper to trigger global loading
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  // Helper to trigger global error
  const triggerError = (message) => setGlobalError(message);
  const clearError = () => setGlobalError(null);

  const value = {
    isLoading,
    startLoading,
    stopLoading,
    globalError,
    triggerError,
    clearError,
    isInitialized,
    themeMode,
    setThemeMode
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook to use the AppContext
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
