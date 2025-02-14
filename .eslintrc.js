// via https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb
module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: ["./tsconfig.json", "./app/tsconfig.json"],
  },
  rules: {
    curly: "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-angle-bracket-type-assertion": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/class-name-casing": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "react/prop-types": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "react/display-name": "warn",
    "react/no-unescaped-entities": "off",
    "prefer-const": "error",
    "default-case": "error",
    "no-fallthrough": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    complexity: "off",
    "max-lines": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "_|tw|React|_",
      },
    ],
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "default",
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
      {
        selector: ["typeLike", "enumMember"],
        format: ["PascalCase"],
      },
    ],
  },
  globals: {
    testContainer: "readonly",
  },
}
