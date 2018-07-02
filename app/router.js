
var init = (app) => {

  var express = require('express')

  var path = require('path')

  var PUBLIC_DIRECTORY = path.join(__dirname,'../static/public');

  var IMAGE_DIRECTORY = path.join(__dirname,'../static/images');

  var LIBRARY_DIRECTORY = path.join(__dirname,'../static/libraries');

  var CLIENT_DIRECTORY = path.join(__dirname,'../static/client');

  var ADMIN_DIRECTORY  = path.join(__dirname,'../static/admin');


  app.use(express.static(PUBLIC_DIRECTORY));

  // home page routing
  app.get('/',(req,res) => {

    console.log("Home Page Accessed")

    app.use(express.static(CLIENT_DIRECTORY));

    app.use(express.static(IMAGE_DIRECTORY));

    app.use(express.static(LIBRARY_DIRECTORY));

    res.sendFile(CLIENT_DIRECTORY+'/index.html')

  })

  // admin page routing
  app.get('/admin',(req,res) => {

    console.log("Admin Page Accessed")

    app.use(express.static(LIBRARY_DIRECTORY));

    app.use(express.static(ADMIN_DIRECTORY));

    res.sendFile(ADMIN_DIRECTORY+'/index.html')

  })

}

module.exports = init;