
import * as React from "react";

/**
 * TODO ?????????????
 */

export class ErrorBoundary extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service

        console.error(error)

        // logErrorToMyService(error, errorInfo);
    }

    render() {
        // @ts-ignore
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div>
                <h4>Something went wrong.</h4>
                {/*{error.}*/}
            </div>
        }

        return this.props.children;
    }
}