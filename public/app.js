console.log('app.js is working');

const app = angular.module('auth_app', []);

app.controller('mainController', ['$http', function($http) {
  this.user = {};
  console.log('this.user is: ', this.user);
  this.users = [];
  this.userPass = {};


  console.log('this.userPass is: ', this.userPass);
  loggedin = false;
  console.log(loggedin);


  this.token = {};
  this.editUser = {};

  this.postEntry = {};


  //hidden pages
  this.home = true;
  this.login = false;
  this.register = false;
  this.userPage = true;
  // this.journal = false;
  // this.destinations = true;
  // this.books = true;
  //

  //input requests
  this.showJournalForm = false;
  this.showBookForm = false;
  this.showDestForm = false;

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
    loggedin = true;
    console.log(loggedin);
    console.log('userPass.username is: ', userPass.username);
    console.log('userPass.password is: ', userPass.password);
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: { user: { username: userPass.username, password: userPass.password }},
    }).then(function(response) {
      console.log(response);
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

  this.editUser = function() {
    $http({
      url: this.url + '/users',
      method: 'PUT',
      headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }.then(function(response) {
      console.log(response);
      this.user = response.data.user;
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }.bind(this))
    })
  }


  this.updateUser = function() {
    $http({
      url: this.url + '/users',
      method: 'POST',
      headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }.then(function(response) {
      console.log(response);
      this.user = response.data.user;
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }.bind(this))
    })
  }

  //delete user
  this.deleteUser = function(userPass) {
    console.log('trying to delete user');
    // $http({
    //   url: this.url + '/users',
    //   method: ''
    //
    // })
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
    }

  this.createEntry = function(){
    this.showJournalForm = true;
  }

  this.journalEntry = function(postEntry) {
    // this.showJournalForm = true;
    $http({
      url: this.url + '/users',
      method: 'POST',
      data: { user: { post: postEntry.post }},
    }).then(function(response) {
      console.log(response);
      this.user = response.data.user;
    })
    // console.log('Journal entry entered. Boom!' + postEntry.post);
    // this.postEntry = postEntry;
    // this.user.post = postEntry;
    this.showJournalForm = false;
  }

  this.createBook = function(){
    this.showBookForm = true;
  }

  this.addBook = function(book){
    $http({
      url: this.url + '/books',
      method: 'POST',
      data: { book: { title: book.title, author: book.author, isbn: book.isbn, genre: book.genre }},
    }).then(function(response) {
      console.log(response);
      this.book = response.data.book;
    }),
    $http({
      url: this.url + '/users',
      method: 'POST',
      data: { user: { book: { title: book.title, author: book.author, isbn: book.isbn, genre: book.genre }}},
    }).then(function(response) {
      console.log(response);
      this.user = response.data.user;
    })
    this.showBookForm = false;
  }

  this.createDest = function(){
    this.showDestForm = true;
  }

  this.addDest = function(destination){
    $http({
      url: this.url + '/destinations',
      method: 'POST',
      data: { destination: { name: destination.name, purpose: destination.purpose, transportation: destination.transportation, season: destination.season, climate: destination.climate }},
    }).then(function(response) {
      console.log(response);
      this.destination = response.data.destination;
    }),
    $http({
      url: this.url + '/users',
      method: 'POST',
      data: { user: { destination: { name: destination.name, purpose: destination.purpose, transportation: destination.transportation, season: destination.season, climate: destination.climate }}},
    }).then(function(response) {
      console.log(response);
      this.user = response.data.user;
    })
    this.showDestForm = false;
  }

  this.userAccount = function(){
    console.log("Account details");
  }

  this.closeForm = function(){
    this.show = false;
  }

  //Tiffany:  (routing to show individual html pages?)

  this.journalEntries = function(){
    this.journal = !this.journal;
    console.log("Journal entries listed");
  }

  this.savedDest = function(){
    console.log("Saved destinations listed");
  }

  this.savedBooks = function(){
    console.log("Saved books listed");
  }

}]); //end controller
