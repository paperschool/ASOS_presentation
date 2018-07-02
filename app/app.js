// app objext
var express = require('express');

var app = express();

// path object for directory access
var path = require('path');

// terminal debugger
var logger = require('morgan');

// appending logger middle ware
app.use(logger('dev'));

// importing routing module && appending route middleware
var router = require('./router')(app);

// exporting express app object
module.exports = app;
