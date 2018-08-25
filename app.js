let GameHandler = require('./server/lobby/model/GameHandler');
let GameSocket = require('./server/secureSocket/GameSocket');

let express = require('express');
let app = express();
let serv = require('http').Server(app);
//Instanciate a game Handler
let gameHandler = new GameHandler.GameHandler();


app.get('/', function(req,res){
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client',express.static(__dirname + '/client'));

serv.listen(2000);
console.log('Server Started');

let SOCKET_LIST = {};

let io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
  let gameSocket = new GameSocket.GameSocket(socket, gameHandler);
  console.log('gameSocket created');
  gameSocket.enable('JOIN');
  gameSocket.disable('JOIN');
});



gameHandler.create('smallworld',undefined)
