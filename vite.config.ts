import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint";

// Export the Vite configuration
export default defineConfig({
  // Set the base path for the application. This should be the root if deploying to a root domain, or a sub-path if deploying to a subdirectory.
  base: "/",

  plugins: [
    react(), // Plugin for React support
    viteTsconfigPaths(), // Plugin to use tsconfig paths
    eslint(), // Plugin for linting
  ],

  build: {
    // Output directory for the build files
    outDir: "dist",

    // Define how to handle source maps in production
    sourcemap: false, // You can set to `true` if you need source maps in production

    // Define the target for the build
    target: "es2015",
  },

  server: {
    // Ensure the browser opens upon server start (only for local development)
    open: true,

    // Set a default port for local development
    port: 3000,

    // Configure server proxy if needed
    // proxy: {
    //   '/api': 'http://localhost:5000',
    // },
  },

  // Optimize the configuration for production
  optimizeDeps: {
    // Pre-bundle dependencies if necessary
  },
});
