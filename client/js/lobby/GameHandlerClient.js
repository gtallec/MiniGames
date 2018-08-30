class GameHandlerClient{

  constructor(){
    /*listOfGameLaunchers is a dictionary indexed on gameName as key and a list
    of game launcers corresponding to this gameName as value*/
    this.dictOfGameLaunchers = {};
    this.lobbyClientGameSocket = undefined;
    this.listOfAvailableGames = ['SmallWorld', 'Monopoly'];
  }
  setSocket(lobbyClientGameSocket)
  {
    lobbyClientGameSocket.enableAllListener();
    this.lobbyClientGameSocket = lobbyClientGameSocket;
    console.log('SOCKET SUCCESSFULLY ADDED');
  }

  display(index,data){
    this.extractGameLaunchers(data,index);
    this.displayAllGameLaunchers();
  }
  displayAllGameLaunchers(){
    let container = document.querySelector('.container')
    for (let i = 0 ; i<this.listOfAvailableGames.length ; i++){

      let gameName = this.listOfAvailableGames[i];
      let socket = this.lobbyClientGameSocket;

      let gameContainer = document.createElement('div');
      gameContainer.setAttribute('id',gameName);
      gameContainer.setAttribute('class', 'gameContainer');

      let gameNameContainer = document.createElement('div');
      gameNameContainer.innerHTML = gameName;

      let gameCreateButton = document.createElement('button');
      gameCreateButton.innerHTML = 'CREATE';
      gameCreateButton.setAttribute('class', 'controlButtons');

      let create = function(){
        socket.create(gameName);
      }
      gameCreateButton.onclick = create;

      let gameListContainer = document.createElement('div');
      gameListContainer.setAttribute('class', 'gameListContainer');

      if (gameName in this.dictOfGameLaunchers){
        for (let i in this.dictOfGameLaunchers[gameName]){
          this.dictOfGameLaunchers[gameName][i].display(gameListContainer);
        }
      }
      gameContainer.appendChild(gameNameContainer);
      gameContainer.appendChild(gameCreateButton);
      gameContainer.appendChild(gameListContainer);
      container.appendChild(gameContainer);
    }
  }
  extractGameLaunchers(data,index){
    for (let gameName in data){
      let gameLauncherList = {};
      for(let indexGameLauncher in data[gameName]){
        let dataElement = data[gameName][indexGameLauncher];
        let maxPlayers = dataElement.maxPlayers;
        let currentPlayers = dataElement.currentPlayers;
        gameLauncherList[indexGameLauncher] = new GameLauncherClient(gameName,currentPlayers,maxPlayers,indexGameLauncher,index,this);
      }
      this.dictOfGameLaunchers[gameName] = gameLauncherList;
    }
    console.log(this.dictOfGameLaunchers);
  }
  join(gameName,gameID){
    this.lobbyClientGameSocket.join(gameName,gameID);
  }
  add(data,index){
    let indexGameLauncher = data.indexGameLauncher;
    let maxPlayers = data.maxPlayers;
    let currentPlayers = data.currentPlayers;
    let gameName = data.gameName;
    console.log(gameName);
    if (!(gameName in this.dictOfGameLaunchers)){
      this.dictOfGameLaunchers[gameName] = {};
    }

    this.dictOfGameLaunchers[gameName][indexGameLauncher] = new GameLauncherClient(gameName,currentPlayers,maxPlayers,indexGameLauncher,index,this);

    let gameListContainer = document.querySelector('#' + gameName).querySelector('.gameListContainer');
    this.dictOfGameLaunchers[gameName][indexGameLauncher].display(gameListContainer);

  }
}
