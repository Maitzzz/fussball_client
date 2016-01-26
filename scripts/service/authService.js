app.service('authService', function ($http) {
  this.saveToken = function(token) {
    $window.localStorage['jwtToken'] = token;
  };

  this.removeToken = function () {
    $window.localStorage.removeItem('jwtToken');
  };

  this.getToken = function() {
    return $window.localStorage['jwtToken'];
  };
});