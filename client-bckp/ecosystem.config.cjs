module.exports = {
  apps: [{
    name: "sosmed/client",
    script: "serve",
    watch: "./dist",
    env: {
      PM2_SERVE_PATH: "./dist",
      PM2_SERVE_PORT: 40080,
      PM2_SERVE_SPA: 'true',
    },
  }]
}