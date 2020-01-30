var config = require('./config.js');
proxy = require('./proxy.js');

module.exports = proxy.run(config);
