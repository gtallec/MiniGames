class GameLauncherClient{

  constructor(gameName, currentPlayers, maxPlayers, index, gameHandler){
    this.gameName = gameName;
    this.currentPlayers = currentPlayers;
    this.maxPlayers = maxPlayers;
    this.index = index;
    this.gameHandler = gameHandler;
  }
  display(gameNameContainer,index){

    let gameLauncher = this;



    let imgHolder = document.createElement('div');
    imgHolder.setAttribute('class', 'imageHolder');
    imgHolder.innerHTML = this.gameName;



    let playerHolder = document.createElement('div');
    playerHolder.setAttribute('class', 'playerHolder');
    playerHolder.innerHTML = this.currentPlayers + '/' + this.maxPlayers;



    let controlButtons = document.createElement('div');
    controlButtons.setAttribute('class', 'controlButtons');


    let joinButton = document.createElement('button');
    joinButton.innerHTML = 'JOIN';

    let join = function(){
      //Send the message to server that a new player entered the game
      console.log('HELLO');
      let gameHandler = gameLauncher.getGameHandler();
      //gameHandler.join()
      window.location = window.location + '/games/' + '?game=' + gameLauncher.getGameName()
                                                    + '?playerID=' + gameLauncher.getIndex();
    }
    joinButton.onclick = join;


    let createButton = document.createElement('button');
    createButton.innerHTML = 'CREATE';


    controlButtons.appendChild(joinButton);
    controlButtons.appendChild(createButton);






    gameNameContainer.appendChild(imgHolder);
    gameNameContainer.appendChild(playerHolder);
    gameNameContainer.appendChild(controlButtons);
  }

  getGameHandler(){
    return this.gameHandler;
  }
  getIndex(){
    return this.index;
  }
  getGameName(){
    return this.gameName;
  }
}
