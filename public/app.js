console.log('app.js is working');

const app = angular.module('auth_app', []);

app.controller('mainController', ['$http', function($http) {
  this.test = 'hi';
  this.login = function(userPass) {
    console.log(userPass);
  }
}]);
