import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  logLevel: "info",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "sign-in": resolve(__dirname, "./src/pages/sign-in-page.html"),
        "sign-out": resolve(__dirname, "./src/pages/sign-out-page.html"),
        500: resolve(__dirname, "./src/pages/500.html"),
        404: resolve(__dirname, "./src/pages/404.html"),
        chat: resolve(__dirname, "./src/pages/chat.html"),
        "view-user-settings": resolve(__dirname, "./src/pages/view-user-settings.html"),
        "change-user-information": resolve(__dirname, "./src/pages/change-user-information.html"),
        "change-user-password": resolve(__dirname, "./src/pages/change-user-password.html"),
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
    },
  },
});
