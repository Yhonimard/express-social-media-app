module.exports = {
  apps: [
    {
      name: "sosmed/client",
      script: 'serve',
      watch: true,
      cwd: "./client-current/dist",
      env: {
        PM2_SERVE_PATH: '.',
        PM2_SERVE_PORT: 40080,
        PM2_SERVE_SPA: 'true',
      }
    }, {
      name: 'sosmed/api',
      script: './build/index.js',
      cwd: "./api",
      watch: "./build",
      ignore_watch: ["node_modules", "./storage"],
    }
  ],
  // deploy: {
  //   production: {
  //     user: 'yhoniserver',
  //     host: '[192.168.1.100]',
  //     ref: 'origin/main',
  //     repo: 'git@github.com:yhonimard/sosmed.git',
  //     path: '/home/webserver/sosmed',
  //     'post-deploy': 'cd ./api && npm install && npm run build && cd ../client-current && npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
  //   }
  // }
};
