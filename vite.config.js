import { defineConfig } from 'vite'
import {resolve} from "path"
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    rollupOptions: {
      input: resolve(__dirname, "index.html")
    }
  },
  plugins: [handlebars()]
})

