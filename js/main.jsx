import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./styles/global.css";
import App from "./App.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
    <Analytics />
  </ErrorBoundary>
);
