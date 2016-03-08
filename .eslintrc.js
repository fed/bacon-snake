module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
  },
  "env": {
    "browser": true,
    "es6": true,
    "jquery": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "require-jsdoc": ["off"],
    "space-before-function-paren": ["error", { "anonymous": "always", "named": "never" }],
    "keyword-spacing": ["error"],
    "no-console": ["off"]
  }
};
