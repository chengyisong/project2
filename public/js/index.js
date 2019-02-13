//var $usersList = $("#users-list");
var $createUser = $("#createBtn");
var $signIn = $("#signInBtn");

function userError(inputBox, errorId, missing) {
  if(!inputBox){
    $(errorId+"-error").text("Please input a " + missing);
    return
  };
};

// The API object contains methods for each kind of request we'll make
var API = {
  saveusers: function (users) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(users)
    });
  },
  getusers: function () {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  updateusers: function (users) {
    return $.ajax({
      url: "api/users",
      type: "PUT",
      data: users,
    });
  }
};


// createNewUser is called whenever we submit a new users
// Save the new users to the db and refresh the list
var createNewUser = function (event) {
  event.preventDefault();
  //get refrences to create an account
  let $newName = $("#createName").val().trim();
  let $newPass = $("#createPass").val().trim();
  let $pic = $("#createPic").val().trim();
  let $catOrDog = $("#catDog").val().trim();
  let $city = $("#city").val().trim();
  let $currenthighscore
  if (localStorage.getItem("currentScore")) {
    $currenthighscore = localStorage.getItem("currentScore");
  } else {
    $currenthighscore = "0"
  }

  var newUsers = {
    name: $newName,
    password: $newPass,
    catDog: $catOrDog,
    pic: $pic,
    city: $city,
    currenthighscore: $currenthighscore,
  };

  if (!(newUsers.name &&
    newUsers.password &&
    newUsers.catDog &&
    newUsers.pic &&
    newUsers.city)) {
      $(".userError-create").text("some fields were left blank")
    return;
  }

  // userError(newUsers.name, "#create-name", "name");
  // userError(newUsers.password, "#create-password", "password");
  // userError(newUsers.catDog, "#create-catDog", "cat or dog preferance");
  // userError(newUsers.name, "#create-pic", "photo");
  // userError(newUsers.name, "#create-city", "city");

  API.saveusers(newUsers);

  location.href = "/score";

};

var signIn = function (event) {
  event.preventDefault();
  // Get refrences to sign in
  var $name = $("#signInName").val().trim();
  var $password = $("#signInPass").val().trim();
  if (localStorage.getItem("currentScore")) {
    $currenthighscore = localStorage.getItem("currentScore");
  } else {
    $currenthighscore = "0"
  }

  var users = {
    name: $name,
    password: $password,
    currenthighscore: $currenthighscore,
  };

  if(!users.name || !users.password) {
    $(".userError-signIn").text("Please input a username and password.")
    return;
  }

  // userError(users.name, "#signIn-name", "name");
  // userError(users.password, "#signIn-password", "password")
 

  API.updateusers(users);
  location.href = "/score";
};


// handleDeleteBtnClick is called when an users's delete button is clicked
// Remove the users from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteusers(idToDelete).then(function () {
    refreshUsers();
  });
};

// Add event listeners to the submit and delete buttons
$createUser.on("click", createNewUser);
$signIn.on("click", signIn);
//$usersList.on("click", ".delete", handleDeleteBtnClick);

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
