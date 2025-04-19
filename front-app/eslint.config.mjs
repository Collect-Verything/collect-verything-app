import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
    {
        files: ["**/*.{js,ts,jsx,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            react: pluginReact,
            "@typescript-eslint": tseslint.plugin,
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...tseslint.configs.recommended[0].rules,
            ...pluginReact.configs.recommended.rules,

            // TypeScript
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-function-return-type": "off",

            // React
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",

            // JS clean
            "no-console": "warn",
            "no-debugger": "error",
            "no-unused-vars": "off",
        },
        settings: {
            react: { version: "detect" },
        },
    },

    // 🔁 Override pour front-app (facultatif)
    {
        files: ["front-app/**/*"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
];
