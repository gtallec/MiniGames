class LobbyClientGameSocket extends ClientGameSocket{

  constructor(socket,holder)
  {
    super(socket,holder)

    //LISTENER PART
      //IDENTIFICATION PROTOCOL
    let lobbyClientGameSocket = this;
    let gameHandlerClient = this.holder;
    let lobbyClientGameSocketID = this.id;

    let identify = function(data){
      let index = data.guestNumber;
      console.log('IDENTIFICATION MESSAGE RECEIVED');
      console.log(index);
      lobbyClientGameSocket.identifyingProtocol(index);
    }
    let display = function(data){
      console.log('DISPLAY MESSAGE RECEIVED');
      gameHandlerClient.display(lobbyClientGameSocketID,data);
    }
    let add = function(data){
      console.log('BIEN RECU MONIQUE',data);
      gameHandlerClient.add(data,lobbyClientGameSocketID);
    }
      //ADDING METHODS TO DICT
    this.addListenerMethod('IDPROT',identify);
    this.addListenerMethod('DISPLAY',display);
    this.addListenerMethod('ADD', add);
    console.log(this.methodDictionary);
  }
  join(gameName,gameID){
    this.emit('JOIN',{
                      gameName : gameName,
                      gameID : gameID
                     }
             );
  }
  create(gameName){
    this.emit('CREATE',{gameName : gameName});
  }
  getIndex(){
    return this.id;
  }
  getHolder(){
    return this.holder;
  }
}
