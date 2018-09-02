let GameHandler = require('./server/lobby/GameHandler');
let LobbyServerGameSocket = require('./server/secureSocket/LobbyServerGameSocket');

let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server)

server.listen(8080);
console.log('Server Started');


//Instanciate a game Handler
let gameHandler = new GameHandler.GameHandler();


app.get('/', function(req,res){
  console.log('dirname' + ' :' + __dirname);
  res.sendFile(__dirname + '/client/html/index.html');
});

app.get('/games/:gameName/:gameID', function(req,res){
  res.setHeader('Content-Type','text/plain');
  res.send('Partie de ' + req.params.gameName + ' n°' + req.params.gameID);
});

app.use('/client',express.static(__dirname + '/client'));

io.on('connection', function(socket){
  let gameSocket = new LobbyServerGameSocket.LobbyServerGameSocket(socket, gameHandler);
  gameSocket.enableAllListener();
  console.log('SOCKET SUCCESSFULLY CREATED');
  gameHandler.addSocket(gameSocket);
});

app.use(function(req, res, next){
  res.setHeader('Content-Type','text/plain');
  res.status(404).send('Page introuvable !');
});
