import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';
import path from 'path';

// Determine the publicPath based on the deployment URL
const publicPath ='/payments/'// process.env.NODE_ENV === 'production' ? '/payments/' : '/';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@':  path.resolve(__dirname, "src"),
    }
  },
  base: '/',
});
