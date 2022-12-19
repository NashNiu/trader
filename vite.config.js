import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

// 获取当前时间戳
const timeStamp = new Date().getTime();
// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [vue()],
  // 开发时候的端口号，默认为3000
  server: {
    port: 3001,
    // https: false,
    // open: true,
    proxy: {
      '/abc': {
        target: 'http://192.168.0.94:9000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/abc/, ''),
      },
    },
  },
  // 打包配置
  build: {
    // 打包文件夹名称
    outDir: 'dist',
    // 打包后去掉console语句
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
    // 打包后的文件名
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].${timeStamp}.js`,
        chunkFileNames: `assets/[name].${timeStamp}.js`,
        assetFileNames: `assets/[name].${timeStamp}.[ext]`,
      },
    },
  },
});
