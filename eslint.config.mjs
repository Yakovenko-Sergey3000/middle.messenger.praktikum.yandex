import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});
export default [{
    ignores: ["dist", "**/*.min.js", "node_modules", "**/vite.config.js", "**/eslint.config.mjs"],
    files: ["src/**/*.ts", "src/**/*.tsx"]
}, ...compat.extends("airbnb"), {
    settings: {
      react: {
        version: '999.999.999',
      }
    },
    rules: {
        "max-len": [2, 100],
        "max-params": [2, 3],
    },
}];
