let ServerGameSocket = require('./ServerGameSocket');

class LobbyServerGameSocket extends ServerGameSocket.ServerGameSocket{

  constructor(socket, holder){
    super(socket, holder);

    let lobbyServerGameSocket = this;
    let gameHandler = this.holder;
    //LISTENER PART
    // CREATE
    let create = function(data){
      let gameName = data.gameName;
      console.log('BONJOUR BONJOUR');
      gameHandler.create(gameName);
    };
    // JOIN
    let join = function(data){
      let gameName = data.gameName;
      let gameNumber = data.gameNumber;
      gameHandler.join(gameName,gameNumber,serverGameSocket);
    };
    let identify = function(data){
      console.log('IDENTIFICATION PROCESS COMPLETED, BRAVO');
      let gameHandler = lobbyServerGameSocket.getHolder();
      gameHandler.display(lobbyServerGameSocket.getIndex());
    };

    //ADDING METHODS TO DICT
    this.addListenerMethod('CREATE',create);
    this.addListenerMethod('JOIN',join);
    this.addListenerMethod('IDPROT',identify);
  }

  display(data){
    console.log('DISPLAY MESSAGE SENT');
    this.emit('DISPLAY', data);
    console.log('dataToSend',data);
  }





































  //GETS FOR USING ANONYMOUS FUNCTIONS
  getHolder(){
    return this.holder;
  }
  getIndex(){
    return this.id;
  }
}

exports.LobbyServerGameSocket = LobbyServerGameSocket;
