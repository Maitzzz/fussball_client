/**
 * Created by mait on 13.09.15.
 */
app.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })

    .when('/games', {
      templateUrl: 'views/games.html',
      controller: 'gamesController'
    })

    .when('/game/:id', {
      templateUrl: 'views/game.html',
      controller: 'gameController'
    })

    .otherwise({redirectTo: '/home'})
});