const tsconfig = require(`./tsconfig`);

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: `module`,
  },
  globals: {
    Atomics: `readonly`,
    SharedArrayBuffer: `readonly`,
  },
  plugins: [`import`],
  extends: [
    `plugin:react/recommended`,
    `plugin:react-hooks/recommended`,
    `plugin:jsx-a11y/recommended`,
    `plugin:@typescript-eslint/recommended`,
    `plugin:import/recommended`,
    `plugin:import/typescript`,
    `plugin:@next/next/recommended`,
    `plugin:prettier/recommended`, // Prettier needs to be the last plugin in list.
  ],
  overrides: [
    {
      files: [`*.ts`, `*.tsx`, `*.d.ts`],
      parserOptions: {
        project: `./tsconfig.json`,
      },
    },
  ],
  rules: {
    "no-shadow": `off`,
    "@typescript-eslint/no-shadow": [`error`],
    camelcase: `off`,
    "no-mixed-operators": `error`,
    "no-unneeded-ternary": `error`,
    "no-nested-ternary": `error`,
    "no-use-before-define": [`off`],
    "no-restricted-syntax": [`off`],
    "jsx-a11y/click-events-have-key-events": `off`,
    "jsx-a11y/no-static-element-interactions": `off`,
    "jsx-a11y/no-noninteractive-element-interactions": `off`,
    "jsx-a11y/anchor-is-valid": `off`,
    "jsx-a11y/anchor-has-content": `off`,
    "import/no-unresolved": `off`,
    "@typescript-eslint/explicit-function-return-type": `off`,
    "@typescript-eslint/explicit-module-boundary-types": `off`,
    "@typescript-eslint/no-use-before-define": [`off`],
    "@typescript-eslint/no-explicit-any": `off`,
    "@typescript-eslint/no-var-requires": `error`,
    "@typescript-eslint/no-unused-vars": `error`,
    "@typescript-eslint/no-shadow": [`error`],
    "@typescript-eslint/quotes": [
      2,
      `backtick`,
      {
        avoidEscape: true,
      },
    ],
    "react/jsx-no-bind": `off`,
    "react/prop-types": `off`,
    "react/display-name": `off`,
    "react/jsx-filename-extension": `off`,
    "react/jsx-props-no-spreading": `off`,
    "react/no-unused-prop-types": `off`,
    "react/react-in-jsx-scope": `off`,
    "react/require-default-props": `off`,
    "react-hooks/exhaustive-deps": `off`,
    "import/prefer-default-export": `off`,
    "import/extensions": [
      `error`,
      `ignorePackages`,
      {
        ts: `never`,
        tsx: `never`,
        js: `never`,
        jsx: `never`,
      },
    ],
    "import/order": [
      `warn`,
      {
        groups: [[`builtin`, `external`], `internal`, [`sibling`, `index`]],
        pathGroups: [
          {
            pattern: `react`,
            group: `external`,
            position: `before`,
          },
          ...Object.keys(tsconfig.compilerOptions.paths).map((key) => ({
            pattern: `${key}*`,
            group: `internal`,
            position: `after`,
          })),
        ],
        pathGroupsExcludedImportTypes: [],
        alphabetize: {
          order: `asc`,
          caseInsensitive: true,
        },
      },
    ],
    "prettier/prettier": [
      `error`,
      {
        endOfLine: `auto`,
      },
    ],
  },
  ignorePatterns: [`next.config.js`],
  settings: {
    "import/resolver": {
      typescript: {
        project: `.`,
      },
    },
    "import/core-modules": [`styled-components`],
    react: {
      version: `detect`,
    },
  },
};
