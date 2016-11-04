var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var five = require("johnny-five");
var board = new five.Board();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendfile(__dirname + 'public/index.html');
});

board.on("ready", function() {
  led = new five.Led(13);

  io.on('connection', function (socket) {
    socket.on('button', (data) => {
      (data.light == 'on') ? led.on() : led.off()
    })
  });
});


server.listen(8080);
