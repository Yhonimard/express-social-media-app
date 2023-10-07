module.exports = {
  apps: [{
    name: "sosmed/client",
    script: "serve",
    env: {
      PM2_SERVE_PATH: "./dist",
      PM2_SERVE_PORT: 2030,
      PM2_SERVE_SPA: 'true',
    },
  }]
}