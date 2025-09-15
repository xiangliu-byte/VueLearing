import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import UnoCss from 'unocss/vite';
import { viteMockServe } from 'vite-plugin-mock'
import path from "node:path";
import VueI18n from "@intlify/unplugin-vue-i18n/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCss(),
    viteMockServe({
      enable: true,        
      mockPath: './src/mock', 
      supportTs: true,     
    }),
    VueI18n({
    runtimeOnly: true,
    compositionOnly: true,
    fullInstall: true,
    include: [path.resolve(__dirname, "locales/**")],
  }),
  ],
  resolve: {
    alias: { '@': '/src' },
  },
  server: {
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/api': {
        target: 'https://www.zhihu.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
// function UnoCSS(): import("vite").PluginOption {
//   throw new Error('Function not implemented.')
// }

