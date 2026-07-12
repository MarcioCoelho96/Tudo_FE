// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    // Ensure ESLint applies this settings block to your JS/TS/TSX files
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", "ts", "tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json", // Explicitly points to your path mappings
        },
      },
    },
  },
]);
