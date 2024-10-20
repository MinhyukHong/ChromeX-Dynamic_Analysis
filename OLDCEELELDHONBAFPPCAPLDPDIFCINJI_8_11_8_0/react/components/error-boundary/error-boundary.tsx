import React, { Component } from "react";
import { TrackerAdapter } from "../../../common/trackerAdapter";

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<React.PropsWithChildren, State> {
	state = { hasError: false };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	componentDidCatch(error: any, errorInfo: any) {
		const [, componentName = "<unknown>"] = String(errorInfo?.componentStack).match(/^[^at]+at\s+([^\s]+)/) || [];

		TrackerAdapter.trackError("js", "react_error_boundary", `[${componentName}] ${error.message}`);
	}

	render() {
		if (this.state.hasError) {
			return null;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
