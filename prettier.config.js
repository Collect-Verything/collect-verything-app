/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  overrides: [
    {
      files: 'front-app/**/*.{ts,tsx,js,jsx}',
      options: {
        tabWidth: 4,
      },
    },
  ],
};
