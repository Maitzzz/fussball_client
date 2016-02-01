app.controller('mainController', function ($scope, testService, $location, myService, authService, $state, appData) {
  $scope.user = false;

  if (authService.getToken()) {
    $scope.user = true;
  }

  $scope.logout = function() {
    authService.removeToken();
    $state.go('home');
  };

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

app.run(function ($rootScope, $websocket, appData, myService, authService, $state, $http) {

  if (authService.getToken()) {
    $http.defaults.headers.common.token = authService.getToken();
  }

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
          appData.setTimerData(message);
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

  $rootScope.$on('$stateChangeStart', function (event, next) {

    if ((next.url == '/login' || next.url == '/register') && authService.getToken()) {
      event.preventDefault();
      $state.go('home');
    }

    if (!next.requireLogin) {
      return;
    }

    if (!authService.getToken()) {
      event.preventDefault();
      console.log('DENY');
       $state.go('login');
    }

  });
});

app.controller('testController', ['$scope', function ($scope) {
  $scope.submit = function () {
    if (form.file.$valid && $scope.file && !$scope.file.$error) {
      $scope.upload($scope.file);
    }
  };
}]);

app.controller('MyCtrl', ['$scope', 'FileUploader', 'authService', function ($scope, FileUploader, authService) {
  var uploader = $scope.uploader = new FileUploader({
    url: 'http://fussball.mait.fenomen.ee/upload',
    headers: {
      'token': authService.getToken()
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

app.controller('timerController', function ($scope, appData, myService, $state, testService) {
  $scope.$watch(function () {
    return appData.getStatus();
  }, function (status, oldValue) {
    if (status != $state.current.name) {
      $state.go(status);
    }
  },true);

  $scope.$watch(function () {
    return appData.getTimerData();
  }, function (status, oldValue) {
    $scope.timer = status;
  },true);

  $scope.add = function() {
    testService.addDraw(false).then(function(ret) {
      console.log(ret)
      myService.messageHandler({type: 'message' , message: ret.data.message});;
    })
  }
});

app.controller('playersController', function ($scope, appData, myService, $state, testService) {
  $scope.$watch(function () {
    return appData.getStatus();
  }, function (status, oldValue) {
    if (status != $state.current.name) {
      $state.go(status);
    }
  },true);

  testService.getPlayers().then(function(data) {
    for (var i = 0; i < data.data.length; i++) {
      if (!data.data[i].file) {
        data.data[i].file = {};
        data.data[i].file.path = 'https://www.bankofenglandearlycareers.co.uk/media/2747/blank-profile.jpg'
      }

      $scope.players = data.data;
    }
  });

});

app.controller('gameController', function ($scope, appData, myService, $state, testService) {

  $scope.$watch(function () {
    return appData.getStatus();
  }, function (status, oldValue) {
    if (status != $state.current.name) {
      $state.go(status);
    }
  },true);

  $scope.$watch(function () {
    return appData.getGameData();
  }, function (status, oldValue) {
    if (status.game == undefined) {
      return;
    }

    $scope.game = status.game;
    $scope.matches= status.matches;

    $scope.team1 = $scope.game.team1;
    $scope.team2 = $scope.game.team2;

    $scope.match = status.matches[status.matches.length -1];

    //Team 1 goals:
    $scope.team1.player1 = $scope.match.goals[$scope.team1.data.player_one.user_id];
    $scope.team1.player2 = $scope.match.goals[$scope.team1.data.player_two.user_id];

    $scope.team1.goals = $scope.team1.player2 + $scope.team1.player1;
    $scope.team2.goals = $scope.team2.player2 + $scope.team2.player1;

    $scope.team2.player1 = $scope.match.goals[$scope.team2.data.player_one.user_id];
    $scope.team2.player2 = $scope.match.goals[$scope.team2.data.player_two.user_id];

  },true);

  $scope.addGoal = function (team, owner) {
    var goal = {
      team: team,
      owner: owner
    };

    testService.addGoal(goal).then(function (data) {
      getGame($scope.game.id)
    })
  };

  function getGame(id) {
    testService.getGame(id).then(function (game) {
      $scope.game = game.data.game;
      $scope.matches = game.data.matches;
    });
  }
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

app.controller('LoginController', ['$scope', 'authService', 'testService', 'myService', '$state', function($scope, authService, testService, myService, $state) {
  $scope.submit = function() {
    var user = $scope.user;

    testService.login(user).then(function(data) {
      console.log(data);
      authService.saveToken(data.data);
      $state.go('game')
    }).catch(function(data){
      myService.errorHandler({message: data.data.message})
    });
  }
}]);

app.controller('registerController', function($scope) {

});

app.controller('testController', function($scope) {

});

app.controller('profileFormController', function($scope) {

});

app.controller('profileController', function($scope, testService) {
  testService.getUser(1).then(function(data) {
    console.log(data.data);
    $scope.profile = data.data;
  })
});

app.controller('RegisterFormController' , function($scope, testService, myService) {
  $scope.submit = function() {
    var user = $scope.user;
    testService.register(user).then(function(data) {
      if (data.status == 200) {
        myService.messageHandler({type: 'message' , message: 'User Registered!'});
      }
    });
  }
});

app.directive('login', function() {
  return {
    templateUrl: 'directives/login.html'
  };
});

app.directive('upload', function() {
  return {
    templateUrl: 'directives/upload.html'
  };
});

app.directive('register', function() {
  return {
    templateUrl: 'directives/register.html'
  };
});



