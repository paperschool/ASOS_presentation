
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

    connections.admins[user.handshake.address] = user;

    console.log("Admin Connected");

    user.on('ready-presentation', () => {

      console.log("Admin Readied Presentation...")

      admin_ready = true;

      // storing reference to next slide
      var slide = presentation.getCurrent();

      // sending slide data to all clients
      for(var client in connections.clients){
        connections.clients[client].emit('reload',slide);
      }

    });

    user.on('next-slide',(msg) => {

      console.log("Admin Changed Slide - Next")

      if(!admin_ready) return;

      // storing reference to next slide
      var slide = presentation.getNext();

      // sending slide data to all admins
      for(var admin in connections.admins){
        connections.admins[admin].emit('slide',slide);
      }

      // sending slide data to all clients
      for(var client in connections.clients){
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

    // fetching ip from socket connection
    var ip = user.handshake.address

    // checking if client already exists
    if(ip in connections.clients){
      console.log("Existing Client Connected");
      connections.clients[ip] = user;
    } else {
      console.log("New Client Connected");
      connections.clients[ip] = user;
    }

    user.on('preferences',(preferences) => {
      connections.clients[user.handshake.address]['name'] = preferences.name
      connections.clients[user.handshake.address]['colour'] = preferences.colour
      user.emit('redirect','/client');
    })


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

}
