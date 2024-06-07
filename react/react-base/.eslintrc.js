module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    ecmaVersion: 'latest',
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/state-in-constructor': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'class-methods-use-this': 'off',
    'react/forbid-prop-types': 0,
    'default-param-last': 'off',
    'prettier/prettier': ['error', { singleQuote: true, jsxSingleQuote: true }],
  },
};
