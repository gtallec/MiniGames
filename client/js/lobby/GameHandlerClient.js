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
    if (!this.everDisplayed){
      //TODO : Modify what's changed
    }
    else{
      //Just copy the data in the dictOfGameLaunchers
      this.dictOfGameLaunchers = data;
      console.log('bjour');
    }
    //retrieve the necessary information for displaying the different gamelaunchers
    let gameLauncherData = this.retrieveAllGameLaunchersData();
    console.log('INDEX', index);
    console.log('DATA SENT TO THE PAGE', gameLauncherData);
    this.listOfLobbyServerGameSockets[index].display(gameLauncherData);
  }
