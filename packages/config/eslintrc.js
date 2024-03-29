const path = require('path');

const project = path.resolve(process.cwd(), "tsconfig.json");

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
  },
  env: { es2021: true },
  globals: {
    React: true,
    JSX: true,
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'import',
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "**/*.css"],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    // General
    'array-callback-return': ['warn'],
    eqeqeq: ['off', 'always', { null: 'ignore' }],
    'new-parens': ['warn'],
    'no-array-constructor': ['warn'],
    'no-caller': ['warn'],
    'no-cond-assign': ['warn', 'always'],
    'no-console': ['warn', { allow: ['warn', 'error', 'reportException', 'info'] }],
    'no-eval': ['warn'],
    'no-extend-native': ['warn'],
    'no-extra-bind': ['warn'],
    'no-implied-eval': ['warn'],
    'no-iterator': ['warn'],
    'no-lone-blocks': ['warn'],
    'no-loop-func': ['warn'],
    'no-multi-str': ['warn'],
    'no-native-reassign': ['warn'],
    'no-new-wrappers': ['warn'],
    'no-script-url': ['warn'],
    'no-self-compare': ['warn'],
    'no-shadow-restricted-names': ['warn'],
    'no-template-curly-in-string': ['warn'],
    'no-throw-literal': ['warn'],
    'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
    'no-use-before-define': ['warn'],
    'no-useless-computed-key': ['warn'],
    'no-useless-concat': ['warn'],
    'no-useless-constructor': ['warn'],
    'no-useless-rename': ['warn'],
    'no-whitespace-before-property': ['warn'],
    'no-unreachable': ['warn'],
    'no-constant-condition': ['warn'],
    'no-case-declarations': ['off'],
    'no-use-before-define': ['off'],
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-redeclare': 'off',
    'no-useless-constructor': 'off',

    // Typescript
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    '@typescript-eslint/strict-boolean-expressions': [
      'warn',
      {
        allowNumber: false,
        allowString: false,
        allowNullableObject: false,
        allowNullableBoolean: true,
      },
    ],

    // React
    'react/prop-types': ['off'],
    'react/no-unescaped-entities': ['off'],
    'react/style-prop-object': ['warn'],
    'react/no-children-props': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'react/function-component-definition': [
      0,
      {
        namedComponents: ['function-declaration', 'function-expression', 'arrow-function'],
        unnamedComponents: ['function-declaration', 'function-expression', 'arrow-function'],
      },
    ],
    'react/display-name': ['off'],

    // Imports
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
};
