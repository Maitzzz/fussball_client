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
    requireLogin: true
  })

  .state('game.draw', {
    url: '/game',
    templateUrl: 'views/game.html'
  })

  .state('game.timer', {
    url: '/game',
    templateUrl: 'views/game.html'
  })

  .state('game.start', {
    url: '/game',
    templateUrl: 'views/game.html'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'views/register.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'views/profile.html',
    controller: 'profileController',
    requireLogin: true
  });
});