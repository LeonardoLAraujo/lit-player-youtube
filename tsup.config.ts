import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],  // ou seu arquivo de entrada
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  outDir: 'dist',
  clean: true,
  external: ['react', 'react-dom'],   // 👈 ESSENCIAL!
});