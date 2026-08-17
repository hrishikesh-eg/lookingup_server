import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// DEPLOY TARGET NOTE:
// Different static hosts serve files from different paths:
//   - GitHub Pages (project site): https://username.github.io/repo-name/
//     -> needs base: "/repo-name/" (must exactly match your repo's name)
//   - S3 static website hosting / CloudFront / Amplify / Vercel / Netlify:
//     -> needs base: "/" (root)
// Control at build time: VITE_BASE_PATH=/your-repo-name/ npm run build
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_PATH || "/lookingup-v2/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
