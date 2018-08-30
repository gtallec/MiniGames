class GameLauncher{

  constructor(gameName){
    this.gameName = gameName;
    //// TODO: from gameName extract from db max and necessary playerSocket
    this.maxPlayers = 5;
    this.mandatoryPlayers = 3;
    this.currentPlayers = 0;
  }

  getGameLauncherData(){
    let data = {};
    console.log('LA COUCARACHA');
    data['currentPlayers'] = this.currentPlayers;
    data['maxPlayers'] = this.maxPlayers;
    return data;
  }
}
exports.GameLauncher = GameLauncher;
