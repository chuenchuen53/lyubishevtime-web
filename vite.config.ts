import { config } from "dotenv";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite'

config();

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
    proxy: {
      "/api-proxy": {
        target: process.env.VITE_API_BASE_URL,
        rewrite: path => path.replace(/^\/api-proxy/, ""),
        configure: proxy => {
          proxy.on("proxyReq", (proxyReq, _req, _res) => {
            proxyReq.setHeader("referer", "http://localhost:3000");
            proxyReq.setHeader("origin", "http://localhost:3000");
            proxyReq.setHeader("host", "localhost:3000");
          });
        },
      },
    },
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
