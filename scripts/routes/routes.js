/**
 * Created by mait on 13.09.15.
 */
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'views/home.html',
    controller: 'homeController'
  })

  .state('game', {
    url: '/game',
    templateUrl: 'views/game.html',
    controller: 'gameController',
    requireLogin: true
  })

  .state('game.timer', {
    url: '',
    templateUrl: 'views/game.html'
  })

  .state('players', {
    url: '/players',
    templateUrl: 'views/players.html',
    controller: 'playersController'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'views/register.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html'
  })

  .state('timer', {
    url: '/timer',
    templateUrl: 'views/timer.html',
    controller: 'timerController'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'views/profile.html',
    controller: 'profileController',
    requireLogin: true
  });
});