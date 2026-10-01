import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://divyanshi12coder.github.io/personatwin-ai-case-study/
// so every asset URL must be prefixed with the repository path.
export default defineConfig({
  base: "/personatwin-ai-case-study/",
  plugins: [react()],
  build: {
    sourcemap: false,
    target: "es2020",
  },
});
