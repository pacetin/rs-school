module.exports = {
    env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "linebreak-style": [2, "windows"],
    "allowForLoopAfterthoughts": 0,
    "no-use-before-define": ["error", { "functions": false, "classes": true, "variables": true }]
  },
};
