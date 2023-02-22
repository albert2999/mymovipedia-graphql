const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'https://mr79ng.sse.codesandbox.io',
      changeOrigin: true,
    })
  );
};