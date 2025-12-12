import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { project: "./tsconfig.eslint.json" }
    },
    rules: {
      // ...tseslint.configs.recommended,
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/member-ordering": [
        "error",
        {
          "default": [
            // Static fields
            "public-static-field",
            "protected-static-field",
            "private-static-field",
            // Static methods
            "public-static-method",
            "protected-static-method",
            "private-static-method",
            // Instance fields
            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",
            // Constructor
            "public-constructor",
            // Instance methods
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method"
            // Note: The rule does NOT distinguish JS #private fields/methods natively.
            // To check for #private ordering, use code review and consistent style.
          ]
        }
      ]
    }
  }
]);
