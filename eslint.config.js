const eslint = require("@eslint/js")
const tseslint = require("typescript-eslint")
const reactRecommended = require("eslint-plugin-react/configs/recommended.js")
const nextPlugin = require("@next/eslint-plugin-next")
const prettier = require("eslint-config-prettier")

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactRecommended,
  prettier,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@next/next": nextPlugin,
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
      "max-lines": ["warn", { max: 1000 }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "_|tw|React|_|eventDate|timeString|slug",
        },
      ],
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "default",
          format: ["camelCase", "snake_case"],
          leadingUnderscore: "allow",
        },
        {
          selector: ["variable", "import"],
          format: ["camelCase", "UPPER_CASE", "PascalCase", "snake_case"],
          leadingUnderscore: "allow",
        },
        {
          selector: ["typeLike", "enumMember"],
          format: ["PascalCase"],
        },
        {
          selector: "property",
          format: ["camelCase", "snake_case", "PascalCase"],
          leadingUnderscore: "allow",
        },
      ],
    },
  },
)
