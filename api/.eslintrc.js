module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    quotes: "off",
    indent: [
      2,
      2,
      { SwitchCase: 1 },
    ],
    "linebreak- style": 0,
    // "no-console": "off",
    // "no-param-reassign": "off",
    // "no-restricted-syntax": "off",
    // "global-require ": "off",
    "no-empty": "off",
    "semi-colon": "off",

  },
};
