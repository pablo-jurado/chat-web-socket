var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3100;

var users = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// make css and js available
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  // console.log('a user connected');

  socket.on('setUsername', function(data){
    // check if user name already exist

    if (users.indexOf(data) === -1){
      users.push(data);
      socket.emit('userSet', {username: data, users: users});
    } else {
      socket.emit('userExists', data + ' username is taken! Try some other username.');
    }
  })

  socket.on('chat message', function(data){
    io.emit('chat message', data);
  });

  socket.on('disconnect', function(){
    // console.log('user disconnected');
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
