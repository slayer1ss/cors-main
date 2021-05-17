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
    'x-heroku-queue-wait-time',
    'x-heroku-queue-depth',
    'x-heroku-dynos-in-use',
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time',
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false,
  },
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
