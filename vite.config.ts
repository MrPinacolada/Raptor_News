import { defineConfig } from "vite";
import  express  from "express";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ssr from "vite-plugin-ssr/plugin";
import { createServer} from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  base:'/Raptor_News',
  plugins: [
    // ssr(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["ion-icon", "lite-youtube"].includes(tag),
        },
      },
    }),
  ],
   resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "@SwiperBundleCss",
        replacement: path.resolve(
          __dirname,
          "./node_modules/swiper/swiper-bundle.min.css"
        ),
      },
      {
        find: "@SwiperBundle",
        replacement: path.resolve(
          __dirname,
          "./node_modules/swiper/swiper-bundle.esm.js"
        ),
      },
      {
        find: "@Swiper",
        replacement: path.resolve(
          __dirname,
          "./node_modules/swiper/swiper.esm.js"
        ),
      },
      {
        find: "@SwiperVue",
        replacement: path.resolve(
          __dirname,
          "./node_modules/swiper/vue/swiper-vue.js"
        ),
      },
    ],
  },
});
