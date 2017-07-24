// =======================
// get the packages we need ============
// =======================
'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var morgan      = require('morgan');
var mongoose    = require('mongoose'); // used to handle queries related to database
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model

var app = express();



// use morgan to log requests to the console
app.use(morgan('dev'));
mongoose.connect(config.database);  // connect to database
app.set('superSecret',config.secret);  //secret variable


app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended : true  }));
app.use(bodyParser.json());

//figlet
var figlet = require('figlet');

  console.log(figlet.textSync('adish', {
      horizontalLayout: 'default',
      verticalLayout: 'default'
  }));

/* // crypto 
  const crypto = require('crypto');

  const secret = 'abcdefg';
  const hash = crypto.createHmac('sha256', secret)
                     .update('I love cupcakes')
                     .digest('hex');
  console.log(hash);
 */
 
/*
figlet('writealone', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

figlet();

*/

// API ROUTES -------------------

// get an instance of the router for api routes
//var apiRoutes  = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
//apiRoutes.post('/authenticate', function(req, res) {
/*app.post('/authenticate', function(req, res) {
console.log('req.body.name' + req.body.name);
console.log('req.body.password' + req.body.password);

console.log('response' + res);


  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {
     (err) throw err;

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

*/
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens

// application -------------------------------------------------------------
app.get('*', function (req, res) {
	res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// =======================
// start the server ======
// =======================

// listen on port
app.listen(port);

console.log('Magic happens at http://localhost:' + port);


module.exports = app;
