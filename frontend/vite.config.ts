import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup-tests.ts',
    css: true,
    coverage: {
      reportsDirectory: './coverage',
      exclude: ['**/Board/**', '**/WithUsersAndBoard/**', '**/Tile/**'],
    },
  },
});
