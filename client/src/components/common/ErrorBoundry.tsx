import React, { ErrorInfo, ReactNode } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../interfaces/common';

/**
 * @fileoverview ErrorBoundary component that catches errors during rendering of its children.
 * @class
 * @extends React.Component
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    /**
     * Constructor for ErrorBoundary component.
     * @constructor
     * @param {ErrorBoundaryProps} props - The properties passed to the component.
     */
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    /**
     * Static method that is called after an error is thrown during rendering.
     * @static
     * @param {Error} error - The error that was thrown.
     * @returns {Object} - The updated state indicating that an error occurred.
     */
    static getDerivedStateFromError(error: Error): { hasError: boolean } {
        console.log(error);
        return { hasError: true };
    }

    /**
     * Lifecycle method that is called after an error is caught.
     * @param {Error} error - The error that was caught.
     * @param {ErrorInfo} errorInfo - Information about the error.
     */
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(error, errorInfo);
        console.error('Error caught by error boundary:', error, errorInfo);
    }

    /**
     * Render method for the ErrorBoundary component.
     * @returns {ReactNode} - The rendered content or an error message.
     */
    render(): ReactNode {
        if (this.state.hasError) {
            return <p>Something went wrong. Please try again later.</p>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
