module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
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
    "keyword-spacing": ["error"]
  }
};
