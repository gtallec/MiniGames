class GameLauncherClient{

  constructor(gameName, currentPlayers, maxPlayers, id, playerID, gameHandler){
    this.gameName = gameName;
    this.currentPlayers = currentPlayers;
    this.maxPlayers = maxPlayers;
    this.id = id;
    this.playerID = playerID;
    this.gameHandler = gameHandler;
  }
  display(gameListContainer){

    let gameLauncher = this;

    let listElementContainer = document.createElement('div');
    listElementContainer.setAttribute('class','gameLauncher');
    listElementContainer.setAttribute('id',this.id);

    let imgHolder = document.createElement('div');
    imgHolder.setAttribute('class', 'imageHolder');
    imgHolder.innerHTML = this.gameName;



    let playerHolder = document.createElement('div');
    playerHolder.setAttribute('class', 'playerHolder');
    playerHolder.innerHTML = this.currentPlayers + '/' + this.maxPlayers;



    let controlButtons = document.createElement('div');



    let joinButton = document.createElement('button');
    joinButton.innerHTML = 'JOIN';

    let gameHandler = this.gameHandler;
    let gameName = this.gameName;
    let gameID = this.id;
    let playerID = this.playerID;
    let join = function(){
      //Send the message to server that a new player entered the game

      gameHandler.join(gameName, gameID);
      window.location = window.location + '/games/' + '?gameName=' + gameName
                                                    + '&gameID=' + gameID
                                                    + '&playerID=' + playerID;
    }
    joinButton.onclick = join;
    joinButton.setAttribute('class', 'controlButtons');


    listElementContainer.appendChild(imgHolder);
    listElementContainer.appendChild(playerHolder);
    listElementContainer.appendChild(joinButton);

    gameListContainer.appendChild(listElementContainer);


  }

  getGameHandler(){
    return this.gameHandler;
  }
  getIndex(){
    return this.index;
  }
  getPlayerID(){
    return this.playerID;
  }
  getGameName(){
    return this.gameName;
  }
  suppressElement(gameListContainer){
    let elementToDelete = gameListContainer.querySelector('#' + this.id);
    gameListContainer.removeChild(elementToDelete);
  }
}
