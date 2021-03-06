var api = 'http://fussball.mait.fenomen.ee/';

app.service('testService', function ($http) {
  this.getGames = function () {
    return $http.get(api + 'games');
  };

  this.currentGame = function() {
    return $http.get(api + 'game');
  };

  this.addGame = function(players) {
    return $http.post(api + 'newgame', players);
  };

  this.getGame = function(id) {
    return $http.get(api + 'game/' + id);
  };

  this.getPlayers = function() {
    return $http.get(api + 'players');
  };

  this.addGoal = function(goal) {
    console.log(goal)
    return $http.post(api + 'addgoal', goal);
  };

  this.login = function(user) {
    return $http.post(api + 'auth', user);
  };

  this.startDraw = function() {
    return $http.get(api + 'start-draw');
  };

  this.register = function(user) {
    return $http.post(api + 'register', user);
  };

  this.getUser = function() {
    return $http.get(api + 'user');
  }

  this.addDraw = function(playerId) {
    return $http.post(api + 'add-player', {player: playerId});
  };

  this.createGame = function(players) {
    return $http.post(api + 'newgame', {"players" : players});
  };

  this.getScore = function(period) {
    return $http.post(api + 'score', {"period" : period});
  }
});