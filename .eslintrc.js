// via https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb
module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:react/recommended",
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:@next/next/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 6, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    project: ["./tsconfig.json"], // Allows the use of rules that require type information from the project
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
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
    "@typescript-eslint/no-floating-promises": "error",
    "react/prop-types": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "react/display-name": "warn",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/no-unescaped-entities": "off",
    "prefer-const": "error",
    "default-case": "error",
    "no-fallthrough": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    complexity: "off",
    "max-lines": "error",
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
    ],
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
    ],
    "@typescript-eslint/naming-convention": [
      "warn",
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
