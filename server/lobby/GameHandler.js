let GameLauncher = require('./GameLauncher')
class GameHandler{

  constructor(){
    /*listOfGameLaunchers is a dictionary indexed on gameName as key and a list
    of game launcers corresponding to this gameName as value*/
    this.dictOfGameLaunchers = {};
    this.listOfLobbyServerGameSockets = {};
    this.indexSocket = 0;
    this.indexGameLauncher = 0;
  }
  addSocket(lobbyServerGameSocket)
  {
    lobbyServerGameSocket.identifyingProtocol(this.indexSocket);
    this.listOfLobbyServerGameSockets[this.indexSocket] = lobbyServerGameSocket;
    this.indexSocket++;
  }

  display(index){
    //retrieve the necessary information for displaying the different gamelaunchers
    let gameLauncherData = this.retrieveAllGameLaunchersData();
    this.listOfLobbyServerGameSockets[index].display(gameLauncherData);
  }
  create(gameName){
    //First create a new GameLauncher
    let gameLauncher = new GameLauncher.GameLauncher(gameName);
    if (!(gameName in this.dictOfGameLaunchers)){
      this.dictOfGameLaunchers[gameName] = {};
    }
    this.dictOfGameLaunchers[gameName][this.indexGameLauncher] = gameLauncher;

    for (let index in this.listOfLobbyServerGameSockets){
      this.addGameLauncher(index,this.indexGameLauncher,gameName, gameLauncher.getGameLauncherData());
    this.indexGameLauncher++;
    }
  }
  addGameLauncher(index, indexGameLauncher, gameName, data){
    data.gameName = gameName;
    data.indexGameLauncher = indexGameLauncher;
    this.listOfLobbyServerGameSockets[index].emit('ADD',data);
    console.log('ICI MONIQUE');
  }

  retrieveAllGameLaunchersData(){
    let data = {};
    for (let gameName in this.dictOfGameLaunchers){
      let gameLauncherList = this.dictOfGameLaunchers[gameName];
      let dataList = {};
      for(let index in gameLauncherList){
        dataList[index] = gameLauncherList[index].getGameLauncherData();
      }
      data[gameName] = dataList;
    }
    return data;
  }
}
exports.GameHandler = GameHandler;
