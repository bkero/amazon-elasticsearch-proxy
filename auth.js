const auth = require('basic-auth');
const config = require('./config.js');

module.exports = function(request, response, next) {
  var user = auth(request)
  //if (!user || process.env.USERNAME !== user.name || process.env.PASSWORD !== user.pass) {
  if (!user || config.username !== user.name || config.password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="example"')
    return response.status(401).send()
  }
  return next()
}
