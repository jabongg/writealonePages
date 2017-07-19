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
     name      : 'jb',
     password  : 'jb',
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


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

console.log('req.body.name' + req.body.name);
console.log('req.body.password' + req.body.password);

console.log('response' + res);


  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      console.log(user);
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});


// =======================
// start the server ======
// =======================

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
