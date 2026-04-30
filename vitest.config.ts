import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // 1. Browser Simulation: Essential for testing React components
    environment: 'jsdom', 
    
    // 2. Global APIs: Allows using 'describe', 'it', 'expect' without imports 
    // (Matches your project-main.mdc preference for clean test files)
    globals: true,
    
    // 3. Setup File: Where you'll put global mocks or testing-library setup
    setupFiles: ['./test/setup.ts'],
    
    // 4. CSS: Set to true if you need to test Tailwind visibility/classes
    css: true,
  },
});