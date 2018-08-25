let GameLauncher = require('./GameLauncher')
class GameHandler{

  constructor(){
    this.listOfGameLaunchers = {};
  }

  create(gameName, playerSocket){
    /*Create an instance of a game and wait for the players to join*/

    if (!(gameName in this.listOfGameLaunchers)){
      this.listOfGameLaunchers[gameName] = [];
    }

    let newGameLauncher = new GameLauncher.GameLauncher(gameName);
    //newGameLauncher.addPlayer(playerSocket);
    this.listOfGameLaunchers[gameName].push(newGameLauncher);
  }

  join(gameName, gameNumber, playerSocket){
    /* Join an existing game */

    if (game in this.listOfGameLaunchers){
      if(number < this.listOfGameLaunchers.length){
        this.listOfGameLaunchers[gameNumber].addPlayer(playerSocket);
      }
    }
  }

}
exports.GameHandler = GameHandler;
