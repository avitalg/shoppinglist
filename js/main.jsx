import { initBotId } from "botid/client/core";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import { captureLandingAttribution } from "./analytics.js";

captureLandingAttribution();

initBotId({
  protect: [
    {
      path: "/api/create-room",
      method: "POST",
    },
  ],
});

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
