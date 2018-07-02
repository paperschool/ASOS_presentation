#!/usr/bin/env node

// requiring bulk logic
var app = require('./app/app');

/**
* Create HTTP server.
*/
var port = 80;

app.set('port', port);

var http = require('http');

var server = http.createServer(app);

var socket = require('./app/socket')(server,app);

/**
 * Get port from environment and store in Express.
 */

server.listen(port);

server.on('error', () => {
  console.log("ERROR IN BIG LETTERS")
});

server.on('listening', () => {
  console.log("LISTENING IN BIG LETTERS")
});
