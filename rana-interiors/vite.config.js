import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In development, API calls go to the Express server (npm run server).
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
});
