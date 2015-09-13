var api = 'http://mait.fenomen.ee:4040/';
app.service('testService', function ($http) {
  this.getGames = function () {
    return $http.get(api + 'games');
  }

  this.addGame = function() {
    return $http.get(api + 'addgame')
  }

  this.getGame = function(id) {
    return $http.get(api + 'game/' + id);
  }
});