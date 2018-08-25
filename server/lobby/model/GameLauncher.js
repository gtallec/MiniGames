class GameLauncher{

  constructor(gameName){
    this.gameName = gameName;
    //// TODO: from gameName extract from db max and necessary playerSocket
    this.maxPlayers = 5;
    this.mandatoryPlayers = 3;
    this.currentPlayers = 0;
    this.listOfSockets = {};
    this.pollResult = {yes : 0, no : 0};
  }

  addPlayer(playerSocket){
    //Parametrize Socket for polling
    let gameLauncher = this;
    this.listOfSockets[this.currentPlayers] = playerSocket
    /*Assign a number to the player*/
    playerSocket.emit('SERVER_DISTRIB',{number : gameLauncher.currentPlayers});

    /*Give possibility to trigger polling*/
    playerSocket.on('PLAYER_POLL_TRIGGER',function(data){
      if(gameLauncher.currentPlayers > gameLauncher.mandatoryPlayers)
      {
        let playerNumber = data.number;
        gameLauncher.pollResult = {yes : 1, no : 0};
        /*Ask for launching to the others*/
        for(let i in this.listOfSockets){
          if (i != data.number){
          gameLauncher.listOfSockets[i].emit('SERVER_POLL_DISTRIB');
          }
        }
      }
    });

    /*Receive result from the poll*/
    playerSocket.on('PLAYER_POLL_ANSWER',function(data){
      if(data.answer){
        gameLauncher.pollResult['yes']++;
      }
      else{
        gameLauncher.pollResult['no']++;
      }

      let yes = gameLauncher.pollResult['yes'];
      let no = gameLauncher.pollResult['no'];

      if(yes + no == gameLauncher.currentPlayers){
        if (yes > no)
        {
          gameLauncher.launch();
        }
      }
    });

    playerSocke

    //add the socket to the list
    this.listOfSockets.push(playerSocket);
    this.currentPlayers++;
    if (this.currentPlayers == this.maxPlayers){
      this.launch()
    }

  }
}
exports.GameLauncher = GameLauncher;
