module.exports = {
  extends: ['eslint-config-airbnb-base'].map(require.resolve),
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
