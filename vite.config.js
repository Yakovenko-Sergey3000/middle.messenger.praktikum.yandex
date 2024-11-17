import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  logLevel: "info",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  css: {
    postcss: "./postcss.config.cjs",
  },
  plugins: [handlebars()],
  resolve: {
    alias: {
      "@layouts": resolve(__dirname, "./src/components/layouts"),
      "@ui": resolve(__dirname, "./src/components/ui"),
      "@global-style": resolve(__dirname, "./src/style.css"),
      "@modules": resolve(__dirname, "./src/modules"),
      "@icons": resolve(__dirname, "./src/static/icons"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@middleware": resolve(__dirname, "./src/middleware"),
    },
  },
});
