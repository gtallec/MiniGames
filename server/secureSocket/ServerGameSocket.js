class ServerGameSocket{
  /* Controls the message that the sockets can receive */
  constructor(socket, holder)
  {
    this.socket = socket;
    // The Game Socket behaves differently depending on the holder
    this.holder = holder;
    //ID to identify the socket, -1 means that the socket is not yet identified
    this.id = -1;
    /* The methodDictionary is a placeholder to monitor exactly what the socket
    can answer to */
    this.methodDictionary = {};
    this.messagePrefixe = 'SRV';
    this.receivePrefixe = 'CLT';
  }

  //LISTENER PART

  enableAllListener(){
    for (let meth in this.methodDictionary){
      this.enableListener(meth.slice(4,meth.length));
    }
  }
  disableAllListener(){
    for (let meth in this.methodDictionary){
      this.disableListener(meth.slice(4,meth.length));
    }
  }

  enableListener(method){
    let meth = this.receivePrefixe + '_' + method;
    if (meth in this.methodDictionary){
      this.socket.on(method,this.methodDictionary[meth]);
    }
  }

  disableListener(method){
    let meth = this.receivePrefixe + '_' + method;
    if (meth in this.methodDictionary){
      this.socket.removeListener(meth,this.methodDictionary[meth]);
    }
  }
  addListenerMethod(method,func){
    let key = this.receivePrefixe + '_' + method;
    this.methodDictionary[key] = func;
  }

  //EMITTER PART
  emit(message,data){
    let mes = this.messagePrefixe + '_' + message;
    this.socket.emit(mes,data)
  }

  identifyingProtocol(index)
  {
    console.log('JE NE SUIS PAS -1 JE SUIS', index);
    this.id = index;
    this.emit('IDPROT',{guestNumber : index});
  }

}
exports.ServerGameSocket = ServerGameSocket;
