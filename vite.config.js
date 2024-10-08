import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
  plugins: [handlebars()],
  resolve: {
    alias: {
      "@widgets": resolve(__dirname, "./src/components/widgets"),
    },
  },
});
