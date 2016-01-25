/**
 * Created by mait on 13.09.15.
 */
app.controller('mainController', function ($scope, testService, $location, myService) {
  $scope.testText = 'Test Text';
  $scope.drawGame = function() {
    testService.startDraw().then(function(rt) {
      $location.path('timer');
    }).catch(function(err) {
      myService.errorHandler(err.data)
    });
  }
});

app.controller('homeController', function ($scope, appData) {

});

app.controller('gameController1', function ($scope, $routeParams, testService) {
  var id = $routeParams.id;
  getGame(id);

  function getGame(id) {
    testService.getGame(id).then(function (game) {
      $scope.game = game.data.game;
      $scope.matches = game.data.matches;
    });
  }

  $scope.addGoal = function (team, owner) {
    var goal = {
      team: team,
      owner: owner
    };

    testService.addGoal(goal).then(function (data) {
      getGame(id)
    })
  }
});

app.controller('gamesController', function ($scope, testService) {
  getGames();

  function getGames() {
    testService.getGames().then(function (games) {
      $scope.games = games.data;
    });
  }

  $scope.newGame = function () {
    testService.addGame().then(function (game) {
      getGames();
    });
  };
});

app.run(function ($rootScope, $websocket, appData, myService) {
  var ws = $websocket.$new({
    url: 'ws://mait.fenomen.ee:4444'
  })

    .$on('$open', function () {
      console.log('Connected to websocket!');
    })

    .$on('$message', function (message) {
      switch (message.type) {
        case 'status':
          appData.setStatus(message.status);
          break;

        case 'timer_data':
          appData.setTimerData(message.time_left);
          break;

        case 'game_data':
          appData.setGameData(message.data);
          break;

        case 'error':
          myService.errorHandler(message);
          break;
        case 'message':
          myService.messageHandler(message);
          break;
      }

      $rootScope.$apply();
    });
});

app.controller('testController', ['$scope', function ($scope) {
  $scope.submit = function () {
    if (form.file.$valid && $scope.file && !$scope.file.$error) {
      $scope.upload($scope.file);
    }
  };
}]);

app.controller('MyCtrl', ['$scope', 'FileUploader', function ($scope, FileUploader) {
  var tet = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InRlc3RAdGVzdC5lZSIsInR5cGUiOjIsImFjdGl2ZSI6dHJ1ZSwicGFzc3dvcmQiOiJzaGExJDI3MWJmMTZhJDEkNWQ4Y2M3Y2M3YTMxZTYzYjJkMGY5ZTFhODZmZmIwYzdhYmMwODBkZiIsImltYWdlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDE1LTEwLTA0VDA5OjEwOjUxLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE1LTEwLTA0VDA5OjEwOjUxLjAwMFoifQ.jBUjgfSgXHzvMDdnhg0E7lydjPOYHvhbxfikiIytpL4';
  var uploader = $scope.uploader = new FileUploader({
    url: 'http://fussball.mait.fenomen.ee/upload',
    headers: {
      'x-access-token': tet
    }
  });

  uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
    console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function (fileItem) {
    console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function (addedFileItems) {
    console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function (item) {
    console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function (fileItem, progress) {
    console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function (progress) {
    console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function (fileItem, response, status, headers) {
    console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function (fileItem, response, status, headers) {
    console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function (fileItem, response, status, headers) {
    console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function (fileItem, response, status, headers) {
    console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function () {
    console.info('onCompleteAll');
  };
}]);

app.controller('timerController', function ($scope, appData, myService, $location) {
  $scope.$watch(function () {
      return appData.getStatus(); }
    , function (status, oldValue) {
      if ('/' + status != $location.path()) {
        $location.path(status);
      }
    },true);

  $scope.$watch(function () {
    return appData.getTimerData();
  }, function (status, oldValue) {
    $scope.timer = status;
  },true);
});

app.controller('playersController', function ($scope, appData, myService, $location, toastr) {
  $scope.$watch(function () {
    return appData.getStatus(); }
    , function (status, oldValue) {
    if ('/' + status != $location.path()) {
      $location.path(status);
    }
  },true);

});

app.controller('gameController', function ($scope, appData, myService, $location, testService) {
  $scope.$watch(function () {
    return appData.getStatus();
  }, function (status, oldValue) {
    if ('/' + status.status != $location.path()) {
      $location.path(status);
    }
  },true);

  $scope.$watch(function () {
    return appData.getGameData();
  }, function (status, oldValue) {
    $scope.game = status.game;
    $scope.matches = status.matches;

    var team1_player1 = $scope.game.team1.data.player_one.user_id;
    var team1_player2 = $scope.game.team1.data.player_two.user_id;

    var team2_player1 = $scope.game.team2.data.player_one.user_id;
    var team2_player2 = $scope.game.team2.data.player_two.user_id;

    if (status.matches != undefined) {
      $scope.lastMatch = status.matches[status.matches.length - 1];

      $scope.team1_player1 = $scope.lastMatch.goals[team1_player1];
      $scope.team1_player2 = $scope.lastMatch.goals[team1_player2];

      $scope.team2_player1 = $scope.lastMatch.goals[team2_player1];
      $scope.team2_player2 = $scope.lastMatch.goals[team2_player2];

    }

  },true);
});

app.factory('appData', function () {
  var gameStatus = '';
  var gameData = {};
  var timerData = {};
  return {
    setStatus: function (data) {
      gameStatus = data;
    },
    getStatus: function () {
      return gameStatus;
    },
    setGameData: function(data) {
      gameData = data;
    },
    getGameData: function() {
      return gameData;
    },
    setTimerData: function(data) {
      timerData = data;
    },
    getTimerData: function() {
      return timerData;
    }
  };
});


app.factory('myService', function (toastr) {
  return {
    errorHandler: function(error) {
      switch (error) {
        case 'not_enough_players':
          toastr.error(error.message);
          break;
        default :
          toastr.error(error.message);
          break;
      }
    },
    messageHandler: function(message) {
      switch (message.type) {
        case 'notify':
          toastr.success(message.message);
          break;
        default :
          toastr.success(message.message);
          break;
      }
    }
  };
});

app.controller('LoginController', ['$scope', 'testService', function($scope, testService) {
  $scope.submit = function() {
    console.log('test');
    console.log($scope.user);

    var user = $scope.user;

    testService.login(user).then(function(data) {
      console.log(data);
    }).catch(function(data){

    });
  }
}]);

app.controller('registerController', function($scope) {


});

app.controller('RegisterFormController' , function($scope, testService) {
  $scope.submit = function() {
    var user = $scope.user;
    testService.register(user).then(function(data) {
      console.log(data);
    });
  }
});