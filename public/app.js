console.log('app.js is working');

const app = angular.module('auth_app', []);

app.controller('mainController', ['$http', function($http) {
  this.user = {};
  this.users = [];
  this.userPass = {};

  //hidden pages
  this.home = true;
  this.login = true;
  this.register = false;
  this.userPage = true;
  this.journal = true;
  this.destinations = true;
  this.books = true;
  this.url = 'http://localhost:3000';
  // this.test = 'hi';

  // register new user
  this.CreateUser = function(userPass) {
     $http({
       url: this.url + '/users',
       method: 'POST',
       data: { user: { username: userPass.username, password: userPass.password }},
     }).then(function(response) {
       console.log(response);
       this.user = response.data.user;
     })
   }

   //login user
  this.login = function(userPass) {

    console.log('The userPass.username & userPass.password ' + userPass.username + ' : ' + userPass.password)
    this.userPass = userPass;

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

  //get user
  this.getUsers = function() {
    $http({
      url: this.url + '/users',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response) {
    console.log(response);
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

  this.toggleLogin = function(){
    this.login = !this.login;
    if(this.register === true){
      this.register = false;
    }
  }
  this.toggleRegister = function(){
    this.register = !this.register;
    if(this.login === false){
      this.login = true;
    }
  }
  this.showAccount = function(){
    this.userPage = !this.userPage;
    if (this.home === false){
      this.home = true;
    } else if (this.journal === false){
      this.journal = true;
    } else if (this.destinations === false){
      this.destinations = true;
    } else if (this.books === false) {
      this.books = true;
    } else {console.log('showAccount is broken');}
  }

  this.createEntry = function(){
    console.log("I'm going to create an entry");
  }

  this.addBook = function(){
    console.log("I'm going to add a book");
  }

  this.addDest = function(){
    console.log("I'm going to add a destination");
  }

  this.userAccount = function(){
    console.log("Account details");
  }

  this.journalEntries = function(){
    console.log("Journal entries listed");
  }

  this.savedDest = function(){
    console.log("Saved destinations listed");
  }

  this.savedBooks = function(){
    console.log("Saved books listed");
  }

}]); //end controller
