$(document).ready(function () {
  let buttonColors = ["green", "red", "yellow", "blue"];
  let gamePattern = [];
  let userClickedPattern = [];
  let level = 0;
  let started = false;
  let stopGame = false;
  let highScore = localStorage.getItem("highScore") || 0;

  $("#highScore").text("High Score: " + highScore);

  $("#startBtn").click(function () {
    if (!started) {
      resetGame();
      started = true;
      stopGame = false;
      $("#status").text("Game Started!");
      nextSequence();
    }
  });

  $("#stopBtn").click(function () {
    stopGame = true;
    started = false;
    $("#status").text("Game Stopped");
  });

  $("#restartBtn").click(function () {
    resetGame();
    started = true;
    stopGame = false;
    $("#status").text("Game Restarted!");
    nextSequence();
  });

  $(".pad").click(function () {
    if (!started || stopGame) return;

    let userChosenColor = $(this).data("color");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  });

  function nextSequence() {
    if (stopGame) return;

    userClickedPattern = [];
    level++;
    $("#level").text("Level: " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor)
      .fadeOut(100)
      .fadeIn(100);

    playSound(randomChosenColor);
  }

  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 800);
      }
    } else {
      playSound("wrong");
      $("#status").text("Wrong! Press Start to try again");
      started = false;

      if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        $("#highScore").text("High Score: " + highScore);
      }
    }
  }

  function animatePress(currentColor) {
    $("#" + currentColor).addClass("active");
    setTimeout(function () {
      $("#" + currentColor).removeClass("active");
    }, 200);
  }

  function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function resetGame() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $("#level").text("Level: 0");
  }
});
