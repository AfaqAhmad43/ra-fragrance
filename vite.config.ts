import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "src/assets/ra-fragrance-logo.png"],
      manifest: {
        name: "RA Fragrance — The Essence of Elegance",
        short_name: "RA Fragrance",
        description: "Premium handcrafted luxury fragrances born in Gujranwala, Pakistan. The Essence of Elegance.",
        theme_color: "#0A0A0E",
        background_color: "#0A0A0E",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/src/assets/ra-fragrance-logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/src/assets/ra-fragrance-logo.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/src/assets/ra-fragrance-logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
