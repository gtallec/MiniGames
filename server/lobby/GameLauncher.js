class GameLauncher{

  constructor(gameName){
    this.gameName = gameName;
    //// TODO: from gameName extract from db max and necessary playerSocket
    this.maxPlayers = 5;
    this.mandatoryPlayers = 3;
    this.currentPlayers = 0;
    this.playerIn = [];
  }

  getGameLauncherData(){
    let data = {};
    data['currentPlayers'] = this.currentPlayers;
    data['maxPlayers'] = this.maxPlayers;
    return data;
  }
  addPlayer(playerID){
    this.playerIn.push(playerID);
    if (this.currentPlayers + 1 > this.maxPlayers){
      return false;
    }
    this.currentPlayers++;
    return true;
  }
  getCurrentPlayer(){
    return this.currentPlayers;
  }
}
exports.GameLauncher = GameLauncher;
