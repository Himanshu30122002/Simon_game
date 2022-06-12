
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// we should keep track whether game has started or not.
var started = false;

// creates a variable level to keep track of level

var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("LEVEL" + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {
  //3. 

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");


    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //now we will invoke nextsequence() as both 3 and 4 steps are true.we will set timer delay.

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("wrong");

    // playsound for wrong
    playSound("wrong");

    // add class game-over to body and remove it after 200 millisec.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //changing h1 tag.
    $("#level-title").text("Game over, press any key to restart");

    // calling startover to start game again.
    startover();


  }
}



function nextSequence() {
  userClickedPattern = [];
  level++;

  // updating the h1 tag to level names
  $("#level-title").text("LEVEL" + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// creating function to start again the game and intializing level from zero, gamepattern and started.
function startover() {

  level = 0;
  gamePattern = [];
  started = false;

}
