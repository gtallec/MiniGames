let GameLauncher = require('./GameLauncher')
class GameHandler{

  constructor(){
    /*listOfGameLaunchers is a dictionary indexed on gameName as key and a list
    of game launcers corresponding to this gameName as value*/
    this.dictOfGameLaunchers = {};
    this.listOfLobbyServerGameSockets = {};
    this.index = 0;
  }
  addSocket(lobbyServerGameSocket)
  {
    lobbyServerGameSocket.identifyingProtocol(this.index);
    this.listOfLobbyServerGameSockets[this.index] = lobbyServerGameSocket;
    this.index++;
    console.log('SOCKET SUCCESSFULLY ADDED');
  }

  display(index){
    //retrieve the necessary information for displaying the different gamelaunchers
    let gameLauncherData = this.retrieveAllGameLaunchersData();
    console.log('INDEX', index);
    console.log('DATA SENT TO THE PAGE', gameLauncherData);
    this.listOfLobbyServerGameSockets[index].display(gameLauncherData);
  }

  retrieveAllGameLaunchersData(){
    let data = {};
    for (let gameName in this.dictOfGameLaunchers){
      let gameLauncherList = this.dictOfGameLaunchers[gameName];
      for(let i = 0 ; i < gameLauncherList.length ; i++){
        gameLauncherList.push(gameLauncherList[i].getGameLauncherData());
      }
      data[gameName] = gameLauncherList;
    }
    return data;
  }
}
exports.GameHandler = GameHandler;
