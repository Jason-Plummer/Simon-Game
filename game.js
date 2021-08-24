$(document).ready(function() {

  var userClickedPattern = [];
  var gamePattern = [];
  var buttonColors = ["red", "blue", "green", "yellow"];
  var randomChosenColor;
  var randomNumber;

  function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
  }

  //flash the div of the randomChosenColor
  function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");

    //remove the class after 100ms
    setTimeout(function() {
      $('#' + currentColor).removeClass("pressed");
    }, 100)
  }

  // $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  //establish path and extension for sound files
  var soundFilePath = "sounds/";
  var soundsFileExtension = ".mp3";

  function playColorSound(selectedSound) {
    var audio = new Audio(soundFilePath + selectedSound + soundsFileExtension);
    audio.play();
    //console.log("button sound = " + selectedSound);
  }

  function playGameOverSound() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
  }

  function animateGameOverFlash() {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100)
  }

  function gameOver() {
    animateGameOverFlash();
    playGameOverSound();
    $("#level-title").text("Press A Key to Start");
    level = 0;
    tracker = 0;
    gameIsStarted = false;
    gamePattern = [];
    userClickedPattern = [];
  }

  //when a button is clicked, add the chosen color based on ID to the user pattern
  var tracker = 0;
  var level = 0;

  $('.btn').click(function(event) {
    //alternative to this is using event.target.id;
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playColorSound(userChosenColor);
    animatePress(userChosenColor);
    console.log("level " + level + "  Tracker: " + tracker +  "  userClickedPattern: " + userClickedPattern + "  Game Pattern " + gamePattern + "  CLICK");

    if (userClickedPattern[tracker] === gamePattern[tracker] ) {

      if (userClickedPattern.length === gamePattern.length) {
        level++;
        $("#level-title").text("Level " + level);
        userClickedPattern = [];

        tracker = 0;

        randomChosenColor = buttonColors[nextSequence()];
        gamePattern.push(randomChosenColor);

        //Delay animation and sound to prevent overlap with user click
        setTimeout(function () {
          animatePress(randomChosenColor);
          playColorSound(randomChosenColor);
        }, 500)

        console.log("level " + level + "  Tracker: " + tracker +  "  userClickedPattern: " + userClickedPattern + "  Game Pattern " + gamePattern  + "  LEVEL INCREASED");

      } else if (userClickedPattern.length < gamePattern.length) {
        console.log("level " + level + "  Tracker: " + tracker +  "  userClickedPattern: " + userClickedPattern + "  Game Pattern " + gamePattern + "  TRACKER LOGIC");
        tracker++;
      }
    } else {
      console.log("level " + level + "  Tracker: " + tracker +  "  userClickedPattern: " + userClickedPattern + "  Game Pattern " + gamePattern + "  GAME OVER");
      gameOver();
    }
  });

  var gameIsStarted = false;
  //wait for a keydown, then generate the first color of the game pattern
  $("body").keydown(function() {
    if (gameIsStarted === false) {
      randomChosenColor = buttonColors[nextSequence()];
      gamePattern.push(randomChosenColor);
      animatePress(randomChosenColor);
      playColorSound(buttonColors[randomNumber]);
      gameIsStarted = true;
      level++;
      $("#level-title").text("Level " + level);

      console.log("level " + level + "  Tracker: " + tracker +  "  userClickedPattern: " + userClickedPattern + "  Game Pattern " + gamePattern + "  KEYDOWN");
    }
  })



});
