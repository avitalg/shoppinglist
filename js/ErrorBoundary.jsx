import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: "40px 24px",
          textAlign: "center",
          maxWidth: 480,
          margin: "0 auto",
          background: "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}>
          <div style={{ fontSize: "3rem" }}>⚠️</div>
          <h2 style={{ fontSize: "1.3rem", color: "#111827" }}>Something went wrong</h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            {this.state.error.message}
          </p>
          <button
            className="btn btn-gray"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
