import React, {ErrorInfo} from 'react';
import {ErrorBoundaryProps, ErrorBoundaryState} from "../../interfaces/common.tsx";

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo);
        console.error('Error caught by error boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <p>Something went wrong. Please try again later.</p>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
