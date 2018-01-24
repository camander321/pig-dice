function Player(name) {
  this.name = name;
  this.score = 0;
  this.running = 0;
  this.total = 0;
}

Player.prototype.addRunning = function (amount) {
  this.running += amount;
  this.total = this.score + this.running;
};

Player.prototype.addScore = function () {
  this.score += this.running;
  this.total = this.score;
  this.running = 0;
};

function switchTurn(player1, player2, currentPlayer) {
  var nextPlayer;
  if (currentPlayer === player1) {
    nextPlayer = player2;
  } else {
    nextPlayer = player1;
  }
  console.log("Switching to: " + nextPlayer.name + "'s turn");
  return nextPlayer;
}

function roll() {
  var number = Math.floor(Math.random() * Math.floor(6)) + 1;
  $("#showRoll").text(number);
  return number;
}

function updateScores(player1, player2) {
  $(".p1Running").text(player1.running);
  $(".p1Score").text(player1.score);
  $(".p1Total").text(player1.total);
  $(".p2Running").text(player2.running);
  $(".p2Score").text(player2.score);
  $(".p2Total").text(player2.total);
}

function animateDice() {
  var elem = document.getElementById("dice");
  var percent = 0;
  var id = setInterval(frame, 5);

  function frame() {
    percent += 0.3;
    var height = Math.abs(Math.sin(percent / 10)) * 100;
    elem.style.left = percent + "%";
    elem.style.bottom = height + "px";
    if (percent > 100)
      clearInterval(id)
  }
}

var player1 = new Player("bill");
var player2 = new Player("bob");
var player = player1;
$(document).ready(function() {


  $("#roll").click(function() {
    animateDice();
    var newRoll = roll();
    player.addRunning(newRoll);
    if (newRoll === 1) {
      player.running = 0;
      player.total = player.score;
      player = switchTurn(player1, player2, player);
    }

    updateScores(player1, player2);

    if (player.total >= 100) {
      $("#result").text("WINNER!!!!");
      $("#result").fadeIn();
      $("#game").hide();
      return;
    }


  })
  $("#hold").click(function() {
    player.addScore();
    updateScores(player1, player2);
    player = switchTurn(player1, player2, player);
  })

});
