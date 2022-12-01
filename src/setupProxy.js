const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/auth',
    createProxyMiddleware({
      // target: 'http://localhost:8080',
      target: 'https://freind-matching-app.herokuapp.com/',
      changeOrigin: true,
    }),
  );
};
