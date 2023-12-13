module.exports = {
  apps: [
    {
      name: 'sosmed/api',
      script: 'src/index.js',
      interpreter: "./node_modules/.bin/babel-node",
      ignore_watch: ["node_modules", "storage"],
      watch: true,
    },
    // {
    //   name: "sosmed/api",
    //   script: "npm",
    //   args: "start",
    //   cwd: "",
    //   interpreter: "babel-node",
    //   ignore_watch: ["node_modules", "storage"],
    //   watch: true,
    // }
  ],
};
