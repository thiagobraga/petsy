import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Match the app's resolution order (vite.config.ts) so tests load the
  // TypeScript modules (e.g. components.tsx) rather than the stale .jsx
  // prototype files that only attach to `window`.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules/', 'dist/', 'coverage/'],
    },
  },
});
