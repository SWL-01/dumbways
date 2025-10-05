import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost',
    open: true, // Automatically open browser
    strictPort: false // Try different port if 3000 is busy
  },
  optimizeDeps: {
    include: ['lucide-react'], // Include instead of exclude to bundle it
    force: true, // Force re-bundling
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          'lucide-react': ['lucide-react']
        }
      }
    }
  }
});
