/**
 * Created by mait on 13.09.15.
 */
app.controller('mainController', function ($scope, appData) {
  $scope.testText = 'Test Text';

});

app.controller('homeController', function ($scope, appData) {

  $scope.login = function () {
    testService.login().then(function (res) {
      console.log(res);
    });
  };



  $scope.home = 'HOME';
});

app.controller('gameController1', function ($scope, $routeParams, testService) {
  var id = $routeParams.id;
    console.log('fadfa')
  getGame(id);

  function getGame(id) {
    testService.getGame(id).then(function (game) {
      $scope.game = game.data;
      console.log(game.data.game.team1)
    });
  }

  function getTeams(team1Id, team2Id) {
    testService.getTeam(team1Id).then(function (team1) {
      $scope.team1 = team1.data;
    });

    testService.getTeam(team2Id).then(function (team2) {
      $scope.team2 = team2.data;
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
    url: 'ws://127.0.0.1:4444'
  })

    .$on('$open', function () {
      console.log('Connected to websocket!');
    })

    .$on('$message', function (message) {
      console.log(message);
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
    $scope.game = status;
  },true);

 /* testService.getTempData().then(function(ret) {
    $scope.game = ret.data;
    console.log(ret.data);
  })*/
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
      switch (error.error_type) {
        case 'not_enough_players':
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