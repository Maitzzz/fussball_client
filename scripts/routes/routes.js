/**
 * Created by mait on 13.09.15.
 */
app.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
/*

    .when('/games', {
      templateUrl: 'views/games.html',
      controller: 'gamesController'
    })

    .when('/game', {
      templateUrl: 'views/game.html',
      controller: 'gameController'
    })

    .when('/game/:id', {
      templateUrl: 'views/game1.html',
      controller: 'gameController1'
    })

    .when('/test', {
      templateUrl: 'views/test2.html',
      controller: 'testController'
    })

    .when('/players', {
      templateUrl: 'views/players.html',
      controller: 'playersController'
    })

    .when('/timer', {
      templateUrl: 'views/timer.html',
      controller: 'timerController'
    })

    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'registerController'
    })
*/
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'registerController'
    })

    .when('/test', {
      templateUrl: 'views/test.html',
      controller: 'testController',
      requireLogin: true
    })

    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'profileController',
      requireLogin: true
    })

    .otherwise({redirectTo: '/home'})
});