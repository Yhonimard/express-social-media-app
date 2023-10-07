module.exports = {
  apps: [
    {
      name: "sosmed/client",
      script: 'serve',
      watch: './client-current/dist',
      env: {
        PM2_SERVE_PATH: './client-current/dist',
        PM2_SERVE_PORT: 40080,
        PM2_SERVE_SPA: 'true',
      }
    }, {
      name: 'sosmed/api',
      script: 'npm',
      args: "run start",
      cwd: "./api",
      watch: "./api",
      interpreter: "./api/node_modules/.bin/babel-node",
      ignore_watch: ["./api/node_modules", "./api/storage"],
    }
  ],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
