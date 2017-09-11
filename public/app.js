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
  this.loginModal = false;
  this.registerModal = false;
  this.userPage = false;
  this.journal = false;
  this.destinations = false;
  this.books = false;


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
    this.loginModal = !this.loginModal;
    if(this.register === true){
      this.register = false;
    }
  }
  this.toggleRegister = function(){
    this.registerModal = !this.registerModal;
    if(this.login === false){
      this.login = true;
    }
  }
  this.showAccount = function(){
    console.log('working on showAccount');
    console.log('loggedin is now: ', loggedin);
      if(loggedin === true){
        console.log('loggedin is now: ', loggedin);
        this.userPage = !this.userPage;
        this.journal = false;
        this.home = false;
        this.destinations = false;
        this.books = false;
        console.log("Account details");
      }

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
      data: { user: { book: { title: book.title }}},
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
      data: { user: { destination: { name: destination.name }}},
    }).then(function(response) {
      console.log(response);
      this.user = response.data.user;
    })
    this.showDestForm = false;
  }


  this.closeForm = function(){
    this.show = true;
  }

  //Toggle pages on button click

  this.journalEntries = function(){
    this.journal = !this.journal;
    this.home = false;
    this.destinations = false;
    this.books = false;
    console.log("Journal entries listed");
  }

  this.savedDest = function(){
    this.destinations = !this.destinations;
    this.journal = false;
    this.home = false;
    this.books = false;
    console.log("Saved destinations listed");
  }

  this.savedBooks = function(){
    this.books = !this.books;
    this.journal = false;
    this.home = false;
    this.destinations = false;
    console.log("Saved books listed");
  }

}]); //end controller
