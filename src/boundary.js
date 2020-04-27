import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Unknown error has occured</h1>
          <h2>task failed successfully</h2>;
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
