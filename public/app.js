console.log('app.js is working');

const app = angular.module('auth_app', []);

app.controller('mainController', ['$http', function($http) {
  this.user = {};
  this.users = [];
  this.userPass = {};
  this.userModal = false;
  this.url = 'http://localhost:3000';
  // this.test = 'hi';
  this.login = function(userPass) {
    // console.log(userPass);
    $http({
        method: 'POST',
        url: this.url + '/users/login',
        data: { user: { username: userPass.username, password: userPass.password }},
      }).then(function(response) {
        // console.log(response);
        this.user = response.data.user;
        localStorage.setItem('token', JSON.stringify(response.data.token));
      }.bind(this));
  }

  this.getUsers = function() {
    $http({
      url: this.url + '/users',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response) {
    // console.log(response);
    // this.error = "Unauthorized"
      if (response.data.status == 401) {
        this.error = "Unauthorized";
      } else {
        this.users = response.data;
      }
    }.bind(this));
  }

  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  }

  this.toggleModal = function(){
    this.userModal = !this.userModal;
  }


}]); //end controller
