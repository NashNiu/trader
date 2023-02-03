import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// 获取当前时间戳
const timeStamp = new Date().getTime();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
          directives: true,
          version: '2.1.5',
        }),
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/css/element.index.scss" as *;`,
      },
    },
  },
  server: {
    port: 3001,
    proxy: {
      // '/apis': {
      //   // target: 'http://192.168.0.94:9000/',
      //   target: 'http://192.168.137.135:9000/',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/apis/, ''),
      // },
      '/lpapi': {
        target: 'http://trader.lp.lan/lpapi',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lpapi/, ''),
      },
      '/wss': {
        target: 'http://trader.lp.lan/wss',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wss/, ''),
        ws: true,
      },
      '/kline': {
        target: 'https://mckline.zzsmgs55.com:9443',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kline/, ''),
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
  optimizeDeps: {
    include: ['@/components/common/tradeViewChart/charting_library.min.js'],
  },
});
