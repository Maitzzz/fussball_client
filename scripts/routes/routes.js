/**
 * Created by mait on 13.09.15.
 */
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html'
    });
/*
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })

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

    .when('/login', {
      templateUrl: 'views/login .html',
      controller: 'loginController',
      requireLogin: true
    })

    .otherwise({redirectTo: '/home'})*/
});