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
// we'll get to these in a second


// =======================
// start the server ======
// =======================

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
