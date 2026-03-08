export const theme = {
  colors: {
    // Backgrounds
    background: {
      primary: '#090515',   // Very dark midnight
      secondary: '#130b2e', // Deep purple-blue
      overlay: 'rgba(9, 5, 21, 0.85)',
    },
    
    // Brand Gradients (defined as CSS strings)
    gradients: {
      primary: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)', // Blue to Purple
      cosmic: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)', // Deep Space
      accent: 'linear-gradient(135deg, #00C6FB 0%, #005BEA 100%)', // Neon Blue
      gold: 'linear-gradient(135deg, #FDEB71 0%, #F8D800 100%)', // Spiritual Gold
      glass: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    },

    // Text Colors
    text: {
      primary: '#FFFFFF',
      secondary: '#94A3B8', // Soft Gray
      accent: '#22D3EE',    // Cyan Glow
      muted: '#64748B',
    },

    // UI Status
    status: {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6',
    },

    // Borders & Dividers
    border: {
      light: 'rgba(255, 255, 255, 0.1)',
      glow: 'rgba(34, 211, 238, 0.5)', // Cyan glow
    }
  },

  // Typography
  typography: {
    fontFamily: {
      sans: '"Inter", "Roboto", sans-serif',
      heading: '"Outfit", "Inter", sans-serif', // Slightly more display-like for headers
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },

  // Spacing & Layout
  layout: {
    borderRadius: {
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px', // Large rounded corners as requested
      full: '9999px',
    },
    containerPadding: '1.5rem', // Standard mobile padding
    headerHeight: '64px',
    bottomNavHeight: '80px',
  },

  // Shadows / Glows
  shadows: {
    card: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    glow: '0 0 15px rgba(34, 211, 238, 0.3)',
    float: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
  },

  // Animation durations
  animation: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  }
};

export default theme;
