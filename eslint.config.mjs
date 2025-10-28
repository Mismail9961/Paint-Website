import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

const isProd = process.env.NODE_ENV === "production";

export default [
  {
    ignores: ["node_modules", ".next", "dist"],
  },

  js.configs.recommended,

  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
      },
    },

    rules: {
      // ✅ Automatically disable console in production builds
      "no-console": isProd ? "error" : "off",
    },
  },
];
