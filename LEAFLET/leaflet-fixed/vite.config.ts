import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.68.63',
    port: 5173,
    https: {
      key: fs.readFileSync('./mkcert+1-key.pem'),
      cert: fs.readFileSync('./mkcert+1.pem'),
    },
  },
  base: "/",
});
