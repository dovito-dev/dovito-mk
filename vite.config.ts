
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'copy-cname',
      closeBundle() {
        // Ensure the CNAME file is copied to the build output
        if (fs.existsSync('CNAME')) {
          fs.copyFileSync('CNAME', 'docs/CNAME');
        }
        
        // Also ensure .nojekyll is in the build output
        fs.writeFileSync('docs/.nojekyll', '');

        // Copy 404.html to ensure proper SPA handling
        if (fs.existsSync('public/404.html')) {
          fs.copyFileSync('public/404.html', 'docs/404.html');
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true
  }
}));
