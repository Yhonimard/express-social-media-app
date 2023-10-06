module.exports = {
  name: "sosmed/client",
  script: "serve",
  env: {
    PM2_SERVE_PATH: '/home/yhoni/dev/sosmed/client-current/dist',
    PM2_SERVE_PORT: 40080,
    PM2_SERVE_SPA: 'true',
    PM2_SERVE_HOMEPAGE: './index.html'
  }
}