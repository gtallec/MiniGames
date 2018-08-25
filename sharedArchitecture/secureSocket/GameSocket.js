class GameSocket{
  /* Controls the message that the sockets can receive */
  constructor(socket, holder, messagePrefixe, receivePrefixe)
  {
    this.socket = socket;
    // The Game Socket behaves differently depending on the holder
    this.holder = holder;
    /* The methodDictionary is a placeholder to monitor exactly what the socket
    can answer to */
    this.methodDictionary = {};
    this.messagePrefixe = messagePrefixe;
    this.receivePrefixe = receivePrefixe;
  }

  //LISTENER PART
  enableListener(method){
    if (method in this.methodDictionary){
      this.socket.on(method,this.methodDictionary[method]);
    }
  }

  disableListener(method){
    if (method in this.methodDictionary){
      this.socket.removeListener(method,this.methodDictionary[method]);
    }
  }
  addListenerMethod(method,func){
    let key = this.receivePrefixe + '_' + method;
    this.methodDictionary[key] = func;
  }

  //EMITTER PART
  emit(message,data){
    let mes = this.messagePrefixe + '_' + message;
    this.socket.emit(message,data)
  }

}
exports.GameSocket = GameSocket;
