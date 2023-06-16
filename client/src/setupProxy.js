const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // 프록시를 사용할 경로
    createProxyMiddleware({
      target: 'http://localhost:5000', // 프록시로 이용할 서버의 주소
      changeOrigin: true, // 대상 서버의 구성에 따라 호스트 헤더의 변경을 해주는 옵션
    })
  );
};