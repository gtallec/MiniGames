let GameSocket = require('../../sharedArchitecture/secureSocket/GameSocket');

class ServerGameSocket extends GameSocket.GameSocket{
  constructor(socket,holder){
    super(socket, holder , 'SRV', 'CLT');
    let serverGameSocket = this;
    //LISTENER PART
    // CREATE
    let create = function(data){
      let gameName = data.gameName;
      serverGameSocket.gameHandler.create(gameName, serverGameSocket);
    };
    // JOIN
    let join = function(data){
      let gameName = data.gameName;
      let gameNumber = data.gameNumber;
      serverGameSocket.gameHandler.join(gameName,gameNumber,serverGameSocket);
    };

    //ADDING METHODS TO DICT
    this.addListenerMethod('CREATE',create);
    this.addListenerMethod('JOIN',join);

  }
}
exports.ServerGameSocket = ServerGameSocket;
