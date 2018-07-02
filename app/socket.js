'use strict'

var connections = {
  "admins":{},
  "clients":{}
}

module.exports.connections = connections;

module.exports = (server,app) => {

  // module responsible for fetching slide data
  var presentation = require('./presentation')

  // socket io module
  var io = require('socket.io')(server);

  // storing socket connection for admin connections
  var admin  = io.of('/admin')

  // storing socket connection for client connections
  var client = io.of('/client')


  var admin_ready = false;

  admin.on('connection',function(user){

    connections.admins[user.id] = user;

    console.log("Admin Connected");

    getUserBase()

    user.on('ready-presentation', () => {

      console.log("Admin Readied Presentation...")

      admin_ready = true;

      // storing reference to next slide
      var slide = presentation.getCurrent();

      // sending slide data to all clients
      for(var client in connections.clients){
        slide.name   = connections.clients[client].name;
        slide.colour = connections.clients[client].colour;
        connections.clients[client].emit('reload',slide);
      }

      // sending slide  data to all admins
      for(var admin in connections.admins){
        if(slide.end){
          slide.points = [];
          for(var client in connections.clients){
            if(connections.clients[client].name)
                slide.points.push(connections.clients[client].name);
          }
        }
        connections.admins[admin].emit('slide',slide);
      }

    });

    user.on('next-slide',(msg) => {

      console.log("Admin Changed Slide - Next")

      if(!admin_ready) return;

      // storing reference to next slide
      var slide = presentation.getNext();

      // sending slide  data to all admins
      for(var admin in connections.admins){

        if(slide.end){

          slide.points = [];

          for(var client in connections.clients){
            if(connections.clients[client].name)
                slide.points.push(connections.clients[client].name);

          }

        }

        connections.admins[admin].emit('slide',slide);

      }

      // sending slide data to all clients
      for(var client in connections.clients){
        slide.name   = connections.clients[client].name;
        slide.colour = connections.clients[client].colour;
        connections.clients[client].emit('next',slide);
      }

    })

    user.on('previous-slide',(msg) => {
      console.log("Admin Changed Slide - Previous")

      if(!admin_ready) return;

      // storing reference to next slide
      var slide = presentation.getPrevious();

      // sending slide data to all admin
      for(var admin in connections.admins){
        connections.admins[admin].emit('slide',slide);
      }

      // sending slide data to all clients
      for(var client in connections.clients){
        slide.name   = connections.clients[client].name;
        slide.colour = connections.clients[client].colour;
        connections.clients[client].emit('previous',slide);
      }

    })

    user.on('disconnect', function(){
      console.log("Admin   Disconnected")
    });

    user.on('reset-presentation', () => {

      console.log("Admin Reset Presentation...")

      admin_ready = true;

      presentation.reset();

    })

  });

  client.on('connection', function(user){

    console.log("Connection From : ",user.request.connection.remoteAddress);

    var ip = user.request.connection.remoteAddress

    // checking if client already exists
    if(ip in connections.clients){

      console.log("Existing Client Connected");

      var name = connections.clients[ip].name;
      var colour = connections.clients[ip].colour;

      connections.clients[ip] = user;

      connections.clients[ip]['name'] = name;
      connections.clients[ip]['colour'] = colour;

      user.emit('initial',{name:name,colour:colour})

      getUserBase()

    } else {
      console.log("New Client Connected");
      connections.clients[ip] = user;
    }

    user.on('preferences',(preferences) => {

      console.log("Client Submitted Preferences ... ",preferences)

      connections.clients[ip]['name'] = preferences.name
      connections.clients[ip]['colour'] = preferences.colour

      user.emit('redirect','/client');

    })

    for(let user in connections.clients){
      console.log("User: ",user);
    }

    if(admin_ready){
      // on reconnect display current slide
      user.emit('reload',presentation.getCurrent())
    }

    user.on('event', function(data){
      console.log("Client Connected")
    });

    user.on('disconnect', function(){
      console.log("Client Disconnected")
    });

  });

  function getUserBase(){

    var users = [];

    for(var client in connections.clients){

      if(connections.clients[client].name){
        users.push({
          name:connections.clients[client].name,
          colour:connections.clients[client].colour}
        )
      }
    }

    admin.emit('users',users);


  }

}
