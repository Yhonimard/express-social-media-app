module.exports = {
  apps: [
    {
      name: 'sosmed-api',
      script: './src/index.js',
      interpreter: "./node_modules/.bin/babel-node",
      ignore_watch: ["node_modules", "storage"],
      watch: true,
    },
    {
      name: "sosmed-dev",
      script: "npm",
      args: "run dev",
      cwd: ".",
      interpreter: "./node_modules/.bin/babel-node",
      ignore_watch: ["node_modules", "storage"],
      watch: true,
    }
  ],
};
