console.log('app.js is working');

const app = angular.module('auth_app', []);

app.controller('mainController', ['$http', function($http) {
  this.user = {};
  console.log('this.user is: ', this.user);
  this.users = [];
  this.userPass = {};
  this.editDisplay = false;


  console.log('this.userPass is: ', this.userPass);
  this.loggedin = false;
  console.log(this.loggedin);


  this.token = {};
  this.editUser = {};
  this.updatedUser = {};
  this.postEntry = {};

  this.userBooks = [];

  //hidden pages
  this.home = true;
  this.loginModal = false;
  this.registerModal = false;
  this.userPage = false;
  this.journal = false;
  this.destinations = false;
  this.books = false;
  this.account = false;


  //input requests
  this.showJournalForm = false;
  this.showBookForm = false;
  this.showDestForm = false;

  this.url = 'http://localhost:3000' || 'http://travelbooksapi.herokuapp.com/';
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
    this.userPass = userPass;
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: { user: { username: userPass.username, password: userPass.password }},
    }).then(function(response) {
      console.log(response);
      this.user = response.data.user;
      localStorage.setItem('token', JSON.stringify(response.data.token));
      if (this.user === undefined){
        this.loggedin = false
      } else {
        this.loggedin = true;
      }
      console.log('user logged in? ', this.loggedin);
      console.log('the user is: ', this.user);
      console.log('the userPass username is: ', userPass.username);
      console.log('the userPass password is: ', userPass.password);
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


//Jen section:
  this.toggleEdit = function(){
    console.log('frontend trying to edit and edit button clicked');
    this.editDisplay = !this.editDisplay;
    console.log('editdisplay toggle works');
    }

  this.editUser = function() {
    console.log('edit button pushed');
    $http({
      url: this.url + '/user',
      method: 'PUT',
      headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }.then(function(response) {
      console.log(response);
      console.log("==================");
      console.log('this is this.user for edit', this.user);
      this.user = response.data;
      console.log("==================");
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }.bind(this))
    })
  }


  this.updateUser = function() {
    $http({
      url: this.url + '/users/' + this.user,
      method: 'POST',
      headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }.then(function(response) {
      console.log(response);
      this.updatedUser = response.data.user;
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }.bind(this))
    })
  }

  //delete user
  this.deleteUser = function(userPass) {
    console.log('trying to delete user');
    $http({
      method: 'DELETE',
      url: this.url + '/users/' + this.user
    }).then(function(response) {
      console.log(response);
      this.logout();
    }.bind(this));
  }

  //   })
  // }

//end Jen section

  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  }



  this.toggleLogin = function(){
    this.loginModal = !this.loginModal
    if(this.registerModal === true){
      this.registerModal = false;
    }
  }

  this.toggleRegister = function(){
    this.registerModal = !this.registerModal
    if(this.loginModal === true){
      this.loginModal = false;
    }
  }

  this.showAccount = function(){
    console.log('working on showAccount');
    console.log('loggedin is now: ', this.loggedin);
      if(this.loggedin === true){
        console.log('loggedin is now: ', this.loggedin);
        this.userPage = !this.userPage;
        this.account = false;
        this.journal = false;
        this.home = false;
        this.destinations = false;
        this.books = false;
        this.loginModal = false;
        this.registerModal = false;
        console.log("User Page");
      }

    }

// save for later? - app 2.0
  // this.createEntry = function(){
  //   this.showJournalForm = true;
  // }
  //
  // this.journalEntry = function(user){
  //   // this.showJournalForm = true;
  //   $http({
  //     url: this.url + '/users',
  //     method: 'POST',
  //     data: { user: { post: user.post }},
  //   }).then(function(response) {
  //     console.log(response);
  //     this.user = response.data;
  //     console.log(this.user);
  //   })
  //   // console.log('Journal entry entered. Boom!' + postEntry.post);
  //   // this.postEntry = postEntry;
  //   // this.user.post = postEntry;
  //   this.showJournalForm = false;
  // }

  this.createBook = function(){
    this.showBookForm = true;
  }

  this.addBook = function(book){
    $http({
      url: this.url + '/users/:user_id/books',
      method: 'POST',
      data: { book: { title: book.title, author: book.author, isbn: book.isbn, genre: book.genre, user_id: this.user.id }},
    }).then(function(response) {
      console.log(response);
      this.book = response.data;
      console.log("==================");
      console.log(this.book);

    }),
    // $http({
    //   url: this.url + '/users/:user_id/books',
    //   method: 'POST',
    //   data: { user: { book: { title: book.title }}},
    // }).then(function(response) {
    //   console.log(response);
    //   this.user = response.data.user;
    // })
    this.showBookForm = false;
  }

  this.showBooks = function(){
    $http({
      url: this.url + '/users/:user_id/books',
      method: 'GET',
    }).then(function(response) {
      console.log(response);
      this.book = response.data;
      console.log("==================");
      console.log(this.book);
    })
  }




  this.createDest = function(){
    this.showDestForm = true;
  }

  this.addDest = function(destination){
    $http({
      url: this.url + '/users/:user_id/destinations',
      method: 'POST',
      data: { destination: { name: destination.name, purpose: destination.purpose, transportation: destination.transportation, season: destination.season, climate: destination.climate, user_id: this.user.id }},
    }).then(function(response) {
      console.log(response);
      this.destination = response.data.destination;
    }),
    // $http({
    //   url: this.url + '/users',
    //   method: 'POST',
    //   data: { user: { destination: { name: destination.name }}},
    // }).then(function(response) {
    //   console.log(response);
    //   this.user = response.data.user;
    // })
    this.showDestForm = false;
  }
//Sarah end section

  this.closeForm = function(){
    this.show = true;
  }

  //Toggle pages on button click

  this.journalEntries = function(){
    this.journal = !this.journal;
    this.home = false;
    this.destinations = false;
    this.books = false
    this.userPage = false;
    this.account = false;
    this.loginModal = false;
    this.registerModal = false;
    console.log("Journal entries listed");
  }

  this.savedDest = function(){
    this.destinations = !this.destinations;
    this.journal = false;
    this.home = false;
    this.books = false;
    this.userPage = false;
    this.account = false;
    this.loginModal = false;
    this.registerModal = false;
    console.log("Saved destinations listed");
  }

  this.savedBooks = function(){
    this.books = !this.books;
    this.journal = false;
    this.home = false;
    this.destinations = false;
    this.userPage = false;
    this.account = false;
    this.loginModal = false;
    this.registerModal = false;
    this.showBooks();
    console.log("Saved books listed");
  }

  this.getAccount = function(){
    this.account = !this.account;
    this.books = false;
    this.journal = false;
    this.home = false;
    this.destinations = false;
    this.userPage = false;
    this.loginModal = false;
    this.registerModal = false;
    console.log("Account details");
  }


  /////////////////////////////////////////


  //add to books to users
  this.addToBooks = function(user_id, book_id){
    $http({
      method: "POST",
      url: '/books/users',
      data: {
        user_id: user_id,
        book_id: book_id
      }
    }).then(function(response){
      if (response.data){
      console.log("the book has been added to user's books");
    } else {
      console.log("keep working on books array");
    }
  }).then(function(error){
    console.log(error);
  })
};



}]); //end controller
