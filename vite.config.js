import { fileURLToPath, URL } from "node:url";
import UnoCSS from "unocss/vite";
import { presetUno, transformerDirectives } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { animatedUno } from 'animated-unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        animatedUno(),
        presetUno(),
        presetIcons({
          collections: {
            mynaui: () => import('@iconify-json/mynaui/icons.json', { assert: { type: 'json' } }),
            custom:{
              check: '<svg width="31" height="25" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7726 24.1401C13.2723 24.708 12.4036 24.7552 11.8447 24.2449L0.914971 14.2655C0.354119 13.7534 0.324371 12.8802 0.849075 12.3311L3.82918 9.21267C4.34031 8.67781 5.18621 8.65252 5.72838 9.15589L11.3325 14.359C11.8931 14.8795 12.7734 14.8322 13.2751 14.2546L25.0458 0.701386C25.5367 0.136153 26.3932 0.0768614 26.9573 0.569064L30.2199 3.41586C30.785 3.90893 30.8414 4.76752 30.3456 5.33023L13.7726 24.1401Z" fill="white"/></svg>'
            }
          },
        }),
      ],
      transformers: [
        transformerDirectives(),
      ],
    }),
    Components({
      resolvers: [],
      dts: "src/components.d.ts", // Correct path for components.d.ts
    }),
    AutoImport({
      imports: [
        'vue',
        {
          "src/stores/oda": ["useOda"],
        },
      ],
      dts: "src/auto-imports.d.ts", // Ensure correct path for auto-imports.d.ts
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "vueapp.js",
        format: "iife", // Immediately Invoked Function Expression to be used as a <script>
        inlineDynamicImports: true,
      },
    },
  },
});