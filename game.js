var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var start = false;
var level = 0;
var i = 0;
var maxLevel;

$("body").keypress(function() {
  if (!start) {
    $("body").removeClass("game-over");
    nextSequence();
    $("h1").html("Level " + level);
    start = true;
  }
});

function gameOver(){

  $("h1").html("Wrong Color ! <br> Level : " + maxLevel + "<br> Press A key to start");
  i = 1;
  level = 0;
  start = false;
  playSound("wrong");
  gamePattern = [];
  $("body").addClass("game-over");

}

function animatePress(currrentColour) {

  $("#" + currrentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currrentColour).removeClass("pressed");
  }, 100);

}

function playSound(soundName) {

  var audio = new Audio("sounds/" + soundName + ".mp3");
  audio.play();

}

function nextSequence() {

  start = true;

  i = 0;

  level++;
  maxLevel = level;

  $("h1").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function checkColour(userChosenColour) {

  if (userChosenColour === gamePattern[i]) {
    i++;
  } else {

    gameOver();

  }

  if (i === gamePattern.length) {

    start = false;
    setTimeout(function() {
      nextSequence();
    }, 1000);

  }

}

$(".btn").click(function() {

  var userChosenColour = this.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);

  if (start) {
    checkColour(userChosenColour);
  }

});
