var gameOver = false;
var score = 0;

// add penguin image
var penguinImg = new Image();
penguinImg.src = "image/penguin.png";
var penguinWidth = 130;
var penguinHeight = 85;

// add mountain image
var mountainImg = new Image();
mountainImg.src = "image/mountain.png";

// add canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// set Penguin starting location & variables
var penguinX = 0;
var penguinY = 0;
var spacePressed = false;
var isFalling = true;
var maxJump = 30;

// set staring speed
var speed = 300;

// set mountains array and push the first mountain into the array
var mountains = [];

// Reset all variables when restarting the game
function reset() {
  gameOver = false;
  score = 0;
  penguinX = 0;
  penguinY = 0;
  spacePressed = false;
  isFalling = true;
  maxJump = 30;
  speed = 300;
  mountains = [];
  mountains.push(new Mountain(0, canvas.height, 200 + Math.random() * 30, 130));
  // push a bunch of mountains object into the array. Make sure each mountain appears after the previous mountain, and width and height are random
  for (i = 1; i < 6; i++) {
    mountains.push(
      new Mountain(
        mountains[i - 1].x + mountains[i - 1].width,
        canvas.height,
        200 + Math.random() * 30,
        50 + Math.random() * 80
      )
    );
  }
  $("#gameOverDiv").css("visibility", "hidden");
  $("#goLoginBtn").attr("hidden", "hidden");
}
// set each Mountain object & create the mountains array to hold all the mountains object
function Mountain(x, y, width, height) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y - height;
  this.update = function() {
    ctx = myGameArea.context;
  };
}

// Listening to the key up/key down
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
  if (event.keyCode === 32) {
    spacePressed = true;
  }
}

function keyUpHandler(event) {
  if (event.keyCode === 32) {
    spacePressed = false;
    isFalling = true;
  }
}

// Penguin Picture
function drawPenguin() {
  ctx.drawImage(penguinImg, penguinX, penguinY, penguinWidth, penguinHeight);
}

function drawMountain(mount) {
  ctx.drawImage(mountainImg, mount.x, mount.y, mount.width, mount.height);
}

function moveMountain() {
  var moveLength = speed / 300;
  for (i = 0; i < mountains.length; i++) {
    mountains[i].x -= moveLength;
    if (mountains[0].x < -mountains[0].width) {
      if (
        penguinY - penguinHeight - (mountains[0].y - mountains[0].height) < 2 &&
        spacePressed === false
      ) {
        isFalling = true;
      }
      mountains.shift();
      mountains.push(
        new Mountain(
          mountains[mountains.length - 1].x +
            mountains[mountains.length - 1].width,
          canvas.height,
          200 + Math.random() * 30,
          50 + Math.random() * 80
        )
      );
    }
  }
  speed += 1;
}

// Draw everything per 0.01 sec
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPenguin();
  moveMountain();
  for (i = 0; i < mountains.length; i++) {
    drawMountain(mountains[i]);
  }

  if (spacePressed && maxJump >= 0 && isFalling === false) {
    if (penguinY > 0) {
      penguinY -= 5;
    } else {
      maxJump -= 1;
      if (maxJump === 0) {
        isFalling = true;
        maxJump = 30;
      }
    }
  } else if (isFalling) {
    penguinY += 2;
    if (
      mountains[1].height > mountains[0].height &&
      mountains[0].width + mountains[0].x < penguinWidth &&
      penguinY >= canvas.height - penguinHeight - mountains[1].height
    ) {
      isFalling = false;
      maxJump = 50;
    } else if (
      penguinY >=
      canvas.height - penguinHeight - mountains[0].height
    ) {
      isFalling = false;
      maxJump = 50;
    }
  }
}

function gameEnd() {
  //   add code to put score into the DB...
  console.log("game end...");
  $("#startBtn").text("Restart");
  $("#startBtn").removeAttr("disabled");
  $("#gameOverDiv").css("visibility", "visible");
  $("#goLoginBtn").attr("hidden", false);
  gameOver = true;
}

// On click funtions when clicking "start" button
$("#startBtn").on("click", function() {
  reset();
  $("#startBtn").attr("disabled", "disabled");
  setInterval(function() {
    if (gameOver === false) {
      if (
        penguinX + penguinWidth > mountains[1].x &&
        penguinY - 3 >= canvas.height - penguinHeight - mountains[1].height
      ) {
        gameOver = true;
        gameEnd();
        return;
      } else {
        draw();
        score += 1;
        $("#score").text(score);
      }
    }
  }, 10);
});

$("#goLoginBtn").on("click", function() {
  localStorage.setItem("currentScore", score);
});
