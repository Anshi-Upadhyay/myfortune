import React from 'react';
import { theme } from '../../styles/theme';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.background.primary,
          color: theme.colors.text.primary,
          padding: theme.layout.containerPadding,
          textAlign: 'center',
          fontFamily: theme.typography.fontFamily.sans,
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔮</div>
          <h1 style={{ 
            fontSize: theme.typography.sizes['2xl'], 
            marginBottom: '0.5rem',
            color: theme.colors.text.accent 
          }}>
            The stars are misaligned...
          </h1>
          <p style={{ 
            fontSize: theme.typography.sizes.base, 
            color: theme.colors.text.secondary,
            marginBottom: '2rem',
            maxWidth: '300px'
          }}>
            Something unexpected happened. The energies need a reset.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              border: `1px solid ${theme.colors.text.accent}`,
              borderRadius: theme.layout.borderRadius.full,
              color: theme.colors.text.accent,
              fontSize: theme.typography.sizes.base,
              cursor: 'pointer',
              fontWeight: theme.typography.weights.medium,
              transition: 'all 0.3s ease',
            }}
          >
            Refresh App
          </button>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ 
              marginTop: '2rem', 
              textAlign: 'left', 
              fontSize: '0.75rem', 
              color: theme.colors.text.muted,
              maxWidth: '100%',
              overflow: 'auto',
              padding: '1rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '8px'
            }}>
              <summary>Error Details</summary>
              <pre>{this.state.error.toString()}</pre>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
