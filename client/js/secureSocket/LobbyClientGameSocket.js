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
    let display = function(data){
      console.log('DISPLAY MESSAGE RECEIVED');
      let gameHandlerClient = lobbyClientGameSocket.getHolder()
      gameHandlerClient.display(this.getIndex(),data);
    }
      //ADDING METHODS TO DICT
    this.addListenerMethod('IDPROT',identify);
    this.addListenerMethod('DISPLAY',display);
    console.log(this.methodDictionary);
  }
  getIndex(){
    return this.id;
  }
  getHolder(){
    return this.holder;
  }
}
