import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "sign-in": resolve(
          __dirname,
          "./src/pages/sign-in-page/sign-in-page.html",
        ),
        "sign-out": resolve(
          __dirname,
          "./src/pages/sign-out-page/sign-out-page.html",
        ),
        500: resolve(__dirname, "./src/pages/500-page/500.html"),
        400: resolve(__dirname, "./src/pages/400-page/400.html"),
      },
    },
  },
  plugins: [handlebars()],
  resolve: {
    alias: {
      "@widgets": resolve(__dirname, "./src/components/widgets"),
      "@ui": resolve(__dirname, "./src/components/ui"),
      "@global-style": resolve(__dirname, "./src/style.css"),
      "@modules": resolve(__dirname, "./src/modules"),
    },
  },
});
