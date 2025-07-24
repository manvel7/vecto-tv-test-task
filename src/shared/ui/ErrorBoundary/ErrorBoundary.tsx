import React, { Component, ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // Log error to error reporting service in production
    if (process.env.NODE_ENV === 'development') {
      // Only log in development
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className='error-boundary'>
          <div className='error-boundary__content'>
            <h1 className='error-boundary__title'>
              Oops! Something went wrong
            </h1>
            <p className='error-boundary__message'>
              We&apos;re sorry, but something unexpected happened. Please try
              refreshing the page.
            </p>
            <button
              className='error-boundary__button'
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='error-boundary__details'>
                <summary>Error Details (Development)</summary>
                <pre className='error-boundary__error-stack'>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
