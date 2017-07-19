$(function () {
  var socket = io();
  // console.log(socket)
  let currentUser = ''
  // send chat message
  $('#register').submit(function(e) {
    e.preventDefault();
    let user = $('#user').val();
    setUsername(user)
  });

  function setUsername (user) {
    socket.emit('setUsername', user);
  };

  socket.on('userSet', function(data) {
    currentUser = data.username
    $('#feedback').html('welcome ' + currentUser)
  });

  socket.on('userExists', function(data) {
    $('#feedback').html(data)
  });

  // send chat message
  $('#chat').submit(function(e){
    e.preventDefault();
    if (currentUser !== '') {
      let = message = $('#m').val()
      if (message !== '') {
        socket.emit('chat message', {user: currentUser, message: message});
      }
    }
  });

  // gets chat message
  socket.on('chat message', function(data) {
    let message = data.message
    let user = data.user
    $('#messages').append('<li><strong>' + user + ':</strong> ' + message);
    window.scrollTo(0, document.body.scrollHeight);
  });

});
