import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  // server: { https: true }, // Not needed for Vite 5+
  plugins: [react(), mkcert()],
  base: "https://benpipz.github.io/PoopyPoClient", // Replace with your repository name
});
