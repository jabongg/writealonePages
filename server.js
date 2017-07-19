// =======================
// get the packages we need ============
// =======================
'use strict'
var express = require('express');
var app     = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose'); // used to handle queries related to database
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(config.database);  // connect to database
app.set('superSecret',config.secret);  //secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended : false  }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


// =======================
// routes ================
// =======================
// basic route
app.get('/', function(request, result) {
  result.send("Node is the base to create great apps on port :" + port);
});


// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes  = express.Router();
// route to authenticate a user (POST http://localhost:8080/api/authenticate)

apiRoutes.post('/authenticate', function(request, result) {
   // find the user
   User.findOne({
     name : request.body.name
   }, function(err, user) {
      if (err) {
        throw err;
      }

      if (!user) {
        console.log('User authentication failed! User not found');
      //  result.json({ success : false, message : 'User authentication failed! User not found'});
      } else if (user) {
          // check if password matches
          if (user.password != request.body.password) {
              console.log('Authentication failed. Wrong password.');
          //   res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
            // if user is found and password is right
            // create a token
            console.log('creating your token');

            var token = jwt.sign(user, app.get('superSecret'), {
               expiresInMinutes: 1440 // expires in 24 hours
            });

             // return the information including token as JSON
             result.json({
               success  : true,
               message  : 'Enjoy your token',
               token    : token
             });
          }
      }
   });
});

// TODO: route middleware to verify a token

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function (request, result) {
  result.json({ message : 'welcome to writealone!'});
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function (request, result) {
  User.find({}, function(error, users) {
    result.send(users);
  });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

app.get('/setup', function(request, result) {
   // create a sample user
   var mike = new User({
     name      : 'Mike McLeneghan',
     password  : 'password',
     admin     : true
   });

    // save the sample user
    mike.save(function(error) {
      if (error) {
        throw error;
      }

      console.log('user saved successfully in db');
      result.json({ success : true });
    });
});

// =======================
// start the server ======
// =======================

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
