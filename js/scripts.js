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

var player1 = new Player("bill");
var player2 = new Player("bob");
var player = player1;
$(document).ready(function() {


  $("#roll").click(function() {
    var newRoll = roll();
    player.addRunning(newRoll);
    if (newRoll === 1) {
      player.running = 0;
      player = switchTurn(player1, player2, player);
    }

    if (player === player1) {
      $(".p1Running").text(player.running);
      $(".p1Score").text(player.score);
      $(".p1Total").text(player.total);
    } else {
      $(".p2Running").text(player.running);
      $(".p2Score").text(player.score);
      $(".p2Total").text(player.total);
    }

    if (player.total >= 10) {
      $("#result").text("WINNER!!!!");
      $("#result").fadeIn();
      $("#game").hide();
      return;
    }


  })
  $("#hold").click(function() {
    player.addScore();
    player = switchTurn(player1, player2, player);
  })

});
