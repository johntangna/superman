module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': [0],
    'linebreak-style': [
      'off',
      'window'
    ],
    "no-multiple-empty-lines": [0, {
      "max": 100
    }],
    'max-len': ["error", {
      code: 300
    }],
    'import/newline-after-import': [0],
    'indent': 0,
    "object-curly-spacing": [0, "never"],
    "func-names": 0,
    "object-shorthand": 0,
    "space-before-function-paren": [0, "always"],
    "comma-dangle": [0, "never"],
    'import/order' : 0,
    'import/first' : 0,
    'no-trailing-spaces' : 0,
    
  },
};
