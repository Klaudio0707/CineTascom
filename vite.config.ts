import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  publicDir: 'public',
  plugins: [react()],
  server: {
    port: 5173, // Porta padrão ou escolha outra se necessário
    open: true, 
    host: true,
  },
});