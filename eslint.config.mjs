// // eslint.config.mjs
// import pluginJs from "@eslint/js";
// import pluginReact from "eslint-plugin-react";
// import tseslint from "typescript-eslint";
// import globals from "globals";
//
// export default [
//   {
//     files: ["**/*.{js,ts,jsx,tsx}"],
//     languageOptions: {
//       parser: tseslint.parser,
//       parserOptions: {
//         ecmaVersion: "latest",
//         sourceType: "module",
//         ecmaFeatures: { jsx: true },
//       },
//       globals: {
//         ...globals.node,
//         ...globals.browser,
//       },
//     },
//     plugins: {
//       react: pluginReact,
//       "@typescript-eslint": tseslint.plugin,
//     },
//     rules: {
//       ...pluginJs.configs.recommended.rules,
//       ...tseslint.configs.recommended[0].rules,
//       ...pluginReact.configs.recommended.rules,
//       "no-unused-vars": "warn",
//       "react/no-unescaped-entities": "off",
//       "@typescript-eslint/no-explicit-any": "warn",
//     },
//     settings: {
//       react: {
//         version: "detect",
//       },
//     },
//   },
// ];
// eslint.config.mjs
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default [
  // 🌐 Global – NestJS / TypeScript backend
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ['./tsconfig.json'], // ou un tsconfig.eslint.json si nécessaire
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended[0].rules,
      "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-inferrable-types": "off",
      "no-console": "warn",
      "no-debugger": "error",
    },
  },

  // 🎨 Override – React frontend (front-app)
  {
    files: ["front-app/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: pluginReact,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
