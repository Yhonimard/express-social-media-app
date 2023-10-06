module.exports = {
  apps: [
    {
      name: "sosmed-client",
      script: 'serve',
      watch: './client-current/dist',
      env: {
        PM2_SERVE_PATH: './client-current/dist',
        PM2_SERVE_PORT: 5001,
        PM2_SERVE_SPA: true,
        PM2_SERVE_HOMEPAGE: '/index.html'
      }
    }, {
      name: 'sosmed-api',
      script: './api/src/index.js',
      interpreter: "./api/node_modules/.bin/babel-node",
      watch: true,
      ignore_watch: ["node_modules", "storage"],
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
