// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { // Configuração do Vitest
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // Arquivo de setup para testes
    css: false, // Ignorar CSS nos testes
  },
});