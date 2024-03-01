var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

function parseEnvList(env) {if (!env) {return [];}return env.split(',');}

var cors_proxy = require('./lib/cors-anywhere');
cors_proxy.createServer({
  originBlacklist: [],
  originWhitelist: [],
  requireHeader: [],
  checkRateLimit: null,
  setHeaders:{
    "Referer": ""
  },
  removeHeaders: [
    'cookie',
    'cookie2',
    'referer',
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time',
    'X-Final-Url',
    'X-Frame-Options',
    'X-Request-Url',
    'x-forwarded-for',
    'x-forwarded-proto',
    'x-forwarded-port',
    'cdn-loop',
    'do-connecting-ip',
    'cf-ray',
    'cf-visitor',
    'cf-ew-via',
    'cf-ipcountry',
    'cf-connecting-ip'
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false,
  },
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
