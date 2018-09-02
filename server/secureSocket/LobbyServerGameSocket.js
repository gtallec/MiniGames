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
      gameHandler.create(gameName);
    };
    // JOIN
    let join = function(data){
      let index = lobbyServerGameSocket.getIndex();
      console.log('FAUT PAS CROIRE CE QUE DISE LES JOURNAUX',index);
      let gameName = data.gameName;
      let gameID = data.gameID;
      gameHandler.join(gameName,gameID,index);
    };
    let identify = function(data){
      let gameHandler = lobbyServerGameSocket.getHolder();
      gameHandler.display(lobbyServerGameSocket.getIndex());
    };

    //ADDING METHODS TO DICT
    this.addListenerMethod('CREATE',create);
    this.addListenerMethod('JOIN',join);
    this.addListenerMethod('IDPROT',identify);
  }

  display(data){
    this.emit('DISPLAY', data);
  }
  join(){
    this.emit('JOIN');
  }
  update(data){
    this.emit('UPDATE',data);
  }
  getIndex(){
    return this.id;
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
