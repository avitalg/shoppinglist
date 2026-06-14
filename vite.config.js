import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // Pre-cache all built assets (JS, CSS, HTML) so the app shell loads
      // even when the device is completely offline.
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        // Firestore uses long-polling XHR — don't cache Firebase API calls.
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/^\/api/, /firestore\.googleapis\.com/],
      },
      manifest: {
        name: "GrocerieShop",
        short_name: "GrocerieShop",
        description: "Real-time shared shopping list for families",
        theme_color: "#16a34a",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
