/**
 * Created by mait on 13.09.15.
 */
app.controller('mainController', function ($scope) {
  $scope.testText = 'Test Text';
});

app.controller('homeController', function ($scope, testService) {

  $scope.login = function()  {
    testService.login().then(function(res) {
      console.log(res);
    });
  };

  $scope.home = 'HOME';
});

app.controller('gameController', function ($scope, $routeParams, testService) {
  var id = $routeParams.id;

  getGame(id);

  function getGame(id) {
    testService.getGame(id).then(function(game) {
      $scope.game = game.data;
      getTeams(game.data.game.team1, game.data.game.team2);
    });
  }

  function getTeams(team1Id, team2Id) {
    testService.getTeam(team1Id).then(function(team1) {
      $scope.team1 = team1.data;
    });

    testService.getTeam(team2Id).then(function(team2) {
      $scope.team2 = team2.data;
    });
  }

  $scope.addGoal = function(team, owner) {
    var goal = {
      team: team,
      owner: owner
    };

    testService.addGoal(goal).then(function(data) {
      getGame(id)
    })
  }
});

app.controller('gamesController', function ($scope, testService) {
  getGames();

  function getGames() {
    testService.getGames().then(function(games) {
      $scope.games = games.data;
    });
  }

  $scope.newGame = function() {
    testService.addGame().then(function(game) {
      getGames();
    });
  };
});
app.run(function ($rootScope, $websocket) {
  var ws = $websocket.$new('ws://127.0.0.1:4444')

  .$on('$open', function() {
    console.log('Connected to websocket!');
  })

  .$on('$message', function(message) {
    console.log(message);
  });
});

/*
app.factory('appData', function() {
  var gameData;
  return {
    setData: function (data) {
      gameData = data;
    },
    getData: function () {
      return gameData;
    }
  }
});*/
