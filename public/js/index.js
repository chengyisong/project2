//var $usersList = $("#users-list");
var $createUser = $("#createBtn");
var $signIn = $("#signInBtn");
var bcrypt = require('bcrypt');
var saltRounds = 10;
var myPlaintextPassword = 's0/\/\P4$$w0rD';
var someOtherPlaintextPassword = 'not_bacon';

// The API object contains methods for each kind of request we'll make
var API = {
  saveusers: function(users) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(users)
    });
  },
  getusers: function() {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  deleteusers: function(id) {
    return $.ajax({
      url: "api/users/" + id,
      type: "DELETE"
    });
  }
};

// refresh users gets new users from the db and repopulates the list
// var refreshUsers = function() {
//   API.getusers().then(function(data) {
//     var $users = data.map(function(users) {
//       var $a = $("<a>")
//         .text(newUsers.text)
//         .attr("href", "/users/" + newUsers.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": newUsers.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $usersList.empty();
//     $usersList.append($users);
//   });
// };

// createNewUser is called whenever we submit a new users
// Save the new users to the db and refresh the list
var createNewUser = function(event) {
  event.preventDefault();
//get refrences to create an account
let $newName = $("#createName").val().trim();
let $newPass = $("#createPass").val().trim();
let $pic = $("#createPic").val().trim();
let $catOrDog = $("#catDog").val().trim();
let $city = $("#city").val().trim();

  var newUsers = {
      name: $newName,
      password: $newPass,
      catDog: $catOrDog,
      pic: $pic,
      city: $city,
  };

  if (!(newUsers.name && 
        newUsers.password && 
        newUsers.catDog && 
        newUsers.pic && 
        newUsers.city)) {
    alert("You left a few fileds blank");
    return;
  }

  console.log(newUsers)
  
  API.saveusers(newUsers)

};

var signIn = function(event) {
  event.preventDefault();
  // Get refrences to sign in
  var $name = $("#signInName").val().trim();
  var $password = $("#signInPassn").val().trim();
  var $signIn = $("#signInBtn").val().trim();

  var users = {
      name: $name,
      password: $password,
  };

  if (!(users.name && users.password)) {
    alert("Please input a username and password");
    return;
  }

  API.saveusers(users)

  console.log(users)
};


// handleDeleteBtnClick is called when an users's delete button is clicked
// Remove the users from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteusers(idToDelete).then(function() {
    refreshUsers();
  });
};

// Add event listeners to the submit and delete buttons

console.log("tst")
$createUser.on("click", createNewUser);
$signIn.on("click", createNewUser);
//$usersList.on("click", ".delete", handleDeleteBtnClick);
