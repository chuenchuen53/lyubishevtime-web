module.exports = {
  root: true,
  plugins: ["solid", "@typescript-eslint", "import"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:solid/typescript"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "object-shorthand": 1,
    "import/no-duplicates": "error",
    "import/no-cycle": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
      },
    ],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/member-ordering": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { vars: "all", argsIgnorePattern: "^_" }],
  },
};
