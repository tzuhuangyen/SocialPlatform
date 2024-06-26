import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        client: 'index.html', // Entry point for client-side code
      },
    },
    outDir: 'dist',
  },
});
