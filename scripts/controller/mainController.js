/**
 * Created by mait on 13.09.15.
 */
app.controller('mainController', function ($scope) {
  $scope.testText = 'Test Text';
});

app.controller('homeController', function ($scope) {
  $scope.home = 'HOME';
});

app.controller('gameController', function ($scope, $routeParams, testService) {
  var id = $routeParams.id;

  getGame(id);

  function getGame(id) {
    testService.getGame(id).then(function(game) {
      $scope.game = game.data;
      console.log(game)
    });
  }
});

app.controller('gamesController', function ($scope, testService) {
  $scope.games = 'Games';
  getGames();
  function getGames() {
    testService.getGames().then(function(games) {
      console.log(games)
      $scope.games = games.data;
    })
  }

  $scope.addGame = function() {
    testService.addGame().then(function(game) {
      getGames();
    });
  }
});