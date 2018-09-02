class LobbyClientGameSocket extends ClientGameSocket{

  constructor(socket,holder)
  {
    super(socket,holder)
    this.nextURL = undefined;
    //LISTENER PART
      //IDENTIFICATION PROTOCOL
    let lobbyClientGameSocket = this;
    let gameHandlerClient = this.holder;

    let identify = function(data){
      let index = data.guestNumber;
      lobbyClientGameSocket.identifyingProtocol(index);
    }
    let display = function(data){
      gameHandlerClient.display(lobbyClientGameSocket.getIndex(),data);
    }
    let add = function(data){
      gameHandlerClient.add(data,lobbyClientGameSocket.getIndex());
      console.log('ADD', data.indexGameLauncher);
    }
    let join = function(){
      console.log(lobbyClientGameSocket.getNextURL());
      window.location = lobbyClientGameSocket.getNextURL();
    }
    let update = function(data){
      gameHandlerClient.update(data);
    }

      //ADDING METHODS TO DICT
    this.addListenerMethod('IDPROT',identify);
    this.addListenerMethod('DISPLAY',display);
    this.addListenerMethod('ADD', add);
    this.addListenerMethod('JOIN', join);
    this.addListenerMethod('UPDATE', update);
  }
  join(gameName,gameID){
    this.emit('JOIN',{
                      gameName : gameName,
                      gameID : gameID
                     }
             );
    console.log('JE PASSE PAR LA');
    this.nextURL = window.location + 'games/'
                                   + gameName + '/'
                                   + gameID
                                   + '?playerID=' + this.id;
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
  getNextURL(){
    return this.nextURL;
  }
}
