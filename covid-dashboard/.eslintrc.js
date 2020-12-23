module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
      "linebreak-style": ["error", (require("os").EOL === "\r\n" ? "windows" : "unix")],
      "allowForLoopAfterthoughts": 0,
      "no-use-before-define": ["error", { "functions": false, "classes": true, "variables": true }],
    }
};
