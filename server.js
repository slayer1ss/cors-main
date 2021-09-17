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

var fs = require('fs');
require('http').createServer(function(req, res) {
  var reqpath="";
  if (req.url === '/AssetsLive/assets/js/TvPlay.js') {reqpath="/AssetsLive/assets/js/TvPlay.js";}
  else if (req.url === '/AssetsLive/assets/js/tvxlive.js') {reqpath="/AssetsLive/assets/js/tvxlive.js";}
  else if (req.url === '/AssetsLive/assets/js/tvxlive-init.js') {reqpath="/AssetsLive/assets/js/tvxlive-init.js";}
  
  if (reqpath!="") {fs.createReadStream(reqpath).pipe(res);return;}cors_proxy.emit('request', req, res);
}).listen(8080);
