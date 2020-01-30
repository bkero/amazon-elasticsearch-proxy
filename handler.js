var config = require('./config.js');
proxy = require('./proxy.js');

exports.handler = proxy.run(config);
