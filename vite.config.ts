import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  server: {
    allowedHosts: true,
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // Garante que o Docker note as mudanças no Linux/Windows
    },
    hmr: {
      // Ajuste para funcionar via Traefik (HTTPS)
      clientPort: 443,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  optimizeDeps: {
    rolldownOptions: {
      external: [],
    },
  },
});
