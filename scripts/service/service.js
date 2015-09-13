var api = 'http://mait.fenomen.ee:4040/';
app.service('testService', function ($http) {
  this.getGames = function () {
    return $http.get(api + 'games');
  }

  this.addGame = function() {
    return $http.get(api + 'creategame')
  }

  this.getGame = function(id) {
    return $http.get(api + 'game/' + id);
  }

  this.addGoal = function(goal) {
    return $http.post(api + 'addgoal', goal);
  }

  this.getTeam = function(id) {
    return $http.get(api + 'team/' + id);
  }
});