class GameSocket{
  /* Controls the message that the sockets can receive */
  constructor(socket, holder)
  {
    this.socket = socket;
    this.holder = holder;
    this.methodDictionary = {};
    //Defining the list of interactions for the sockets
    let gameSocket = this;
    // CREATE
    this.methodDictionary['CREATE'] = function(data){
      let gameName = data.gameName;
      gameSocket.gameHandler.create(gameName, gameSocket);
    };
    // JOIN
    this.methodDictionary['JOIN'] = function(data){
      let gameName = data.gameName;
      let gameNumber = data.gameNumber;
      gameSocket.gameHandler.join(gameName,gameNumber,gameSocket);
    }
  }

  enable(method){
    this.socket.on(method,this.methodDictionary[method]);
  }

  disable(method){
    this.socket.removeListener(method,this.methodDictionary[method]);
  }

}
exports.GameSocket = GameSocket;
