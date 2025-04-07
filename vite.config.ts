
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/dovito-mk/',
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
        fs.copyFileSync('CNAME', 'docs/CNAME');
        
        // Also ensure .nojekyll is in the build output
        if (fs.existsSync('.nojekyll')) {
          fs.copyFileSync('.nojekyll', 'docs/.nojekyll');
        } else {
          // Create it if it doesn't exist
          fs.writeFileSync('docs/.nojekyll', '');
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
