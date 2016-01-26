app.service('authService', function ($http, $window) {
  this.saveToken = function(token) {
    $window.localStorage.setItem('jwtToken', token);
  };

  this.removeToken = function () {
    $window.localStorage.removeItem('jwtToken');
  };

  this.getToken = function() {
    return $window.localStorage.getItem('jwtToken');
  };
});