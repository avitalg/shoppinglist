import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// The production CSS bundle is small (~8 KiB). A separate stylesheet link is
// render-blocking, so fold it into the HTML and drop the extra request.
function inlineBuiltCss() {
  return {
    name: "inline-built-css",
    apply: "build",
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const bundle = ctx.bundle;
        if (!bundle) return html;
        return html.replace(/<link\b[^>]*\brel="stylesheet"[^>]*>/g, (tag) => {
          const href = tag.match(/\bhref="([^"]+)"/)?.[1];
          if (!href) return tag;
          const asset = bundle[href.replace(/^\//, "")];
          if (!asset || asset.type !== "asset") return tag;
          let css = typeof asset.source === "string"
            ? asset.source
            : Buffer.from(asset.source).toString("utf8");
          css = css.replace(/<\/style/gi, "<\\/style");
          css = css.replace(
            /\/\*# sourceMappingURL=\S+ \*\//,
            `/*# sourceMappingURL=${href}.map */`,
          );
          return `<style>${css}</style>`;
        });
      },
    },
  };
}

export default defineConfig({
  build: {
    // Publish .map files next to hashed bundles so DevTools and Lighthouse
    // can map minified first-party JS back to the original source.
    sourcemap: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // Default injection emits a parser-blocking /registerSW.js in <head>.
      // Inline the few lines that register the worker on window load instead.
      injectRegister: "inline",
      // Pre-cache all built assets (JS, CSS, HTML) so the app shell loads
      // even when the device is completely offline.
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        // Firestore uses long-polling XHR — don't cache Firebase API calls.
        navigateFallback: "index.html",
        // Don't SPA-fallback real files (sitemap, robots, verification HTML, images).
        navigateFallbackDenylist: [/^\/api/, /firestore\.googleapis\.com/, /\.[^/]+$/],
      },
      manifest: {
        name: "GroceryPair",
        short_name: "GroceryPair",
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
    inlineBuiltCss(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
