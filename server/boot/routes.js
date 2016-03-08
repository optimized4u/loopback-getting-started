// Use Express Router
module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/express-ping', function(req, res) {
    res.send('Using the normal Express Router');
  });
  app.use(router);

  // Or the Loopback way without Express Router
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('pong');
  });
}
