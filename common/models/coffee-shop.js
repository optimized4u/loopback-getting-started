module.exports = function(CoffeeShop) {
  // Custom remote method to extend API, this example shows if shop is open or not.
  // Try http://localhost:3000/explorer/#!/CoffeeShop/CoffeeShop_status to test.
  CoffeeShop.status = function(cb) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;
    console.log('Current hour is ' + currentHour);
    var response;
    if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    cb(null, response);
  };
  CoffeeShop.remoteMethod(
    'status',
    {
      http: { path: '/status', verb: 'get' },
      returns: { arg: 'status', type: 'string' }
    }
  );

  // Another Remote Method example to GET shop name.
  // Try http://localhost:3000/explorer/#!/CoffeeShop/CoffeeShop_getName to test.
  // NOTE: Will not work with MongoDB id as it's a string.
  CoffeeShop.getName = function(shopId, cb) {
    CoffeeShop.findById(shopId, function(err, instance) {
      response = "Name of coffee shop is " + instance.name;
      cb(null, response);
      console.log(response);
    });
  }

  CoffeeShop.remoteMethod(
    'getName',
    {
      http: { path: '/getname', verb: 'get' },
      accepts: { arg: 'id', type: 'string', http: { source: 'query' } },
      returns: { arg: 'name', type: 'string' }
    }
  );
};
