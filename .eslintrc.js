module.exports = {
  parser: '@babel/eslint-parser',
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    quotes: [2, 'single'],
    semi: [2, 'always'],
    curly: [2, 'all'],
    camelcase: [
      2,
      {
        properties: 'always',
      },
    ],
    eqeqeq: [2, 'smart'],
    'one-var-declaration-per-line': [2, 'always'],
    'new-cap': 2,
    'no-case-declarations': 0,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    arguments: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
