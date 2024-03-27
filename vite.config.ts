import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@components/": "/src/components/",
      "@layouts/": "/src/layouts/",
      "@assets/": "/src/assets/",
      "@stores/": "/src/stores/",
      "@context/": "/src/context/",
      "@utils/": "/src/utils/",
      "@lib/": "/src/lib/",
      "@auth/": "/src/auth/",
      "@openapi/": "/src/openapi/",
      "@reactivity/": "/src/reactivity/",
    },
  },
});
