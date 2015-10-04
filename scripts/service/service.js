var api = 'http://fussball.mait.fenomen.ee/';
app.service('testService', function ($http) {
  this.getGames = function () {
    return $http.get(api + 'games');
  };

  this.addGame = function(players) {
    return $http.post(api + 'newgame', players);
  };

  this.getGame = function(id) {
    return $http.get(api + 'game/' + id);
  };

  this.addGoal = function(goal) {
    return $http.post(api + 'addgoal', goal);
  };

  this.getTeam = function(id) {
    return $http.get(api + 'team/' + id);
  };

  this.login = function() {
    return $http.get(api + 'auth/google');
  }
});