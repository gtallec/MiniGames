class LobbyClientGameSocket extends ClientGameSocket{

  constructor(socket,holder)
  {
    super(socket,holder)

    //LISTENER PART
      //IDENTIFICATION PROTOCOL
      let lobbyClientGameSocket = this;
    let identify = function(data){
      let index = data.guestNumber;
      console.log('IDENTIFICATION MESSAGE RECEIVED');
      console.log(index);
      lobbyClientGameSocket.identifyingProtocol(index);
    }
      //ADDING METHODS TO DICT
    this.addListenerMethod('IDPROT',identify);
    console.log(this.methodDictionary);
  }
}
