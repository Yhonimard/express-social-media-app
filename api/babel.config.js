module.exports = {
  presets: [
    [
      "@babel/preset-env",
      { targets: { node: true } },
    ],
  ],
  ignore: [
    "./node_modules",
    "./.babelrc",
    "./package.json",
    "./npm-debug.log",
  ],
  env: {
    debug: {
      sourceMaps: "inline",
      retainLines: true,
    },
  },
};
