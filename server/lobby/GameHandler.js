let GameLauncher = require('./GameLauncher')
class GameHandler{

  constructor(){
    this.listOfGameLaunchers = {};
    this.listOfLobbyServerGameSockets = {};
    this.index = 0;
  }
  addSocket(lobbyServerGameSocket)
  {
    lobbyServerGameSocket.enableListener('IDPROT');
    lobbyServerGameSocket.identifyingProtocol(this.index);
    this.listOfLobbyServerGameSockets[this.index] = lobbyServerGameSocket;
    this.index++;
    console.log('SOCKET SUCCESSFULLY ADDED');
  }
  create(gameName, playerNumber){
    //CREATE THE GAME
    if (!(gameName in this.listOfGameLaunchers)){
      this.listOfGameLaunchers[gameName] = [];
    }
    let newGameLauncher = new GameLauncher.GameLauncher(gameName);
    newGameLauncher.addPlayer(playerNumber);
    this.listOfGameLaunchers[gameName].push(newGameLauncher);

    //MAKE THE PLAYER THAT CREATED IT JOIN
    this.join(gameName,playerNumber);

  }

  join(gameName, playerNumber){
    //JOIN AN EXISTING GAME
    if (gameName in this.listOfGameLaunchers){
      this.listOfGameLaunchers[gameName].addPlayer(playerNumber);
    }
  }

}
exports.GameHandler = GameHandler;
