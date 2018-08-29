class GameHandlerClient{

  constructor(){
    /*listOfGameLaunchers is a dictionary indexed on gameName as key and a list
    of game launcers corresponding to this gameName as value*/
    this.everDisplayed = false;
    this.dictOfGameLaunchers = {};
    this.lobbyClientGameSocket = undefined;
  }
  setSocket(lobbyClientGameSocket)
  {
    lobbyClientGameSocket.enableAllListener();
    this.lobbyClientGameSocket = lobbyClientGameSocket;
    console.log('SOCKET SUCCESSFULLY ADDED');
  }

  display(index,data){
    if (this.everDisplayed){
      //TODO : Modify what's changed
    }
    else{
      //Just copy the data in the dictOfGameLaunchers
      this.extractGameLaunchers(data,index);
      this.displayGameLaunchers();
    }
  }
  displayGameLaunchers(){
    let container = document.querySelector('.container')
    for (let gameName in this.dictOfGameLaunchers){
      let gameNameContainer = document.createElement('div');
      gameNameContainer.setAttribute('id',gameName);
      for (let i = 0 ; i < this.dictOfGameLaunchers[gameName].length ; i++){
        this.dictOfGameLaunchers[gameName][i].display(gameNameContainer);
      }
      container.appendChild(gameNameContainer);
    }
  }
  extractGameLaunchers(data,index){
    for (let gameName in data){
      let gameLauncherList = [];
      for(let i = 0 ; i < data[gameName].length ; i++){
        let dataElement = data[gameName][i];
        let maxPlayers = dataElement.maxPlayers;
        let currentPlayers = dataElement.currentPlayers;
        gameLauncherList.push(new GameLauncherClient(gameName,currentPlayers,maxPlayers,index,this));
      }
      this.dictOfGameLaunchers[gameName] = gameLauncherList;
    }
    console.log(this.dictOfGameLaunchers)
  }
}
