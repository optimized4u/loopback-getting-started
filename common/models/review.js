module.exports = function(Review) {
  // Defines a Remote Hook on Review Model.
  // Called before a new instance of the Review model is created.
  Review.beforeRemote('create', function(context, user, next) {
    var req = context.req;
    // Set the date of the review instance to the current date.
    req.body.date = Date.now();
    // Insert the publisherId using the access token attached to the request.
    req.body.publisherId = req.accessToken.userId;
    next();
  });
};
