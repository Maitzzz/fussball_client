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

  this.getTeam = function(id) {
    return $http.get(api + 'team/' + id);
  };

  this.getTempData = function() {
    return $http.get('http://fussball.mait.fenomen.ee/test');
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

  this.getUser = function(is) {
    return $http.get(api + 'user');
  }

});