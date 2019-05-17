// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

// Grab the blacklist from the command-line so that we can update the blacklist without deploying
// again. CORS Anywhere is open by design, and this blacklist is not used, except for countering
// immediate abuse (e.g. denial of service). If you want to block all origins except for some,
// use originWhitelist instead.
var originBlacklist = parseEnvList(process.env.CORSANYWHERE_BLACKLIST);
var originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);
function parseEnvList(env) {
  if (!env) {
    return [];
  }
  return env.split(',');
}

// Set up rate-limiting to avoid abuse of the public CORS Anywhere server.
var checkRateLimit = require('./lib/rate-limit')(process.env.CORSANYWHERE_RATELIMIT);

var cors_proxy = require('./lib/cors-anywhere').createServer({
  originBlacklist: originBlacklist,
  originWhitelist: [
    'http://kuponuna103.com','https://kuponuna103.com',
    'http://www.kuponuna103.com','https://www.kuponuna103.com',
    'http://mobil.kuponuna103.com','https://mobil.kuponuna103.com',
    'http://tv.kuponuna103.com','https://tv.kuponuna103.com',    
    'http://canlitribun3.com','https://canlitribun3.com',
    'http://www.canlitribun3.com','https://www.canlitribun3.com',
    'http://mobil.canlitribun3.com','https://mobil.canlitribun3.com',
    'http://tv.canlitribun3.com','https://tv.canlitribun3.com'
  ],
  requireHeader: ['origin', 'x-requested-with'],
  checkRateLimit: checkRateLimit,
  removeHeaders: [
    'cookie',
    'cookie2',
    'referer',
    // Strip Heroku-specific headers
    'x-heroku-queue-wait-time',
    'x-heroku-queue-depth',
    'x-heroku-dynos-in-use',
    'x-request-start',
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
    xfwd: false,
  },
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});

var fs = require('fs');
require('http').createServer(function(req, res) {
  if (req.url === '/crossdomain.xml') {
    fs.createReadStream('crossdomain.xml').pipe(res);
    return;
  }
  // Let the server handle it
  cors_proxy.emit('request', req, res);
}).listen(8080); // Listen on port 8080.
