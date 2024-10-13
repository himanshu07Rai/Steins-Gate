/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "next/core-web-vitals", // Next.js recommended linting rules
    "eslint:recommended", // ESLint recommended rules
    "plugin:@typescript-eslint/recommended", // TypeScript recommended rules
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020, // Allows modern ECMAScript features
    sourceType: "module", // Allows the use of imports
    project: "./tsconfig.json", // Ensure ESLint uses your TypeScript config
  },
  plugins: ["@typescript-eslint"],
  env: {
    browser: true, // Specifies browser global variables
    es2020: true, // Enables modern ES features
    node: true, // Node.js global variables and Node.js scoping
  },
  ignorePatterns: ["node_modules", "dist"], // Ignore these folders
  rules: {
    // Customize specific rules as needed
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/react-in-jsx-scope": "off", // React is globally available in Next.js
  },
};
