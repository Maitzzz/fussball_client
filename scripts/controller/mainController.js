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
  var ws = $websocket.$new({
    url: 'ws://127.0.0.1:4444',
  })

  .$on('$open', function() {
    console.log('Connected to websocket!');
  })

  .$on('$message', function(message) {
    console.log(message);
  });
});

app.controller('testController',  ['$scope', function($scope) {
  $scope.submit = function() {
    if (form.file.$valid && $scope.file && !$scope.file.$error) {
      $scope.upload($scope.file);
    }
  };
}]);

app.controller('MyCtrl', ['$scope', 'FileUploader', function($scope, FileUploader) {
  var tet = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InRlc3RAdGVzdC5lZSIsInR5cGUiOjIsImFjdGl2ZSI6dHJ1ZSwicGFzc3dvcmQiOiJzaGExJDI3MWJmMTZhJDEkNWQ4Y2M3Y2M3YTMxZTYzYjJkMGY5ZTFhODZmZmIwYzdhYmMwODBkZiIsImltYWdlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDE1LTEwLTA0VDA5OjEwOjUxLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE1LTEwLTA0VDA5OjEwOjUxLjAwMFoifQ.jBUjgfSgXHzvMDdnhg0E7lydjPOYHvhbxfikiIytpL4';
  var uploader = $scope.uploader = new FileUploader({
    url: 'http://fussball.mait.fenomen.ee/upload',
    headers: {
      'x-access-token': tet
    }
  });

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
    console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
    console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
    console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
    console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
    console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
    console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
    console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
    console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
    console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
    console.info('onCompleteAll');
  };
}]);
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