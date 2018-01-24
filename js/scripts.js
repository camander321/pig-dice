function Player(name) {
  this.name = name;
  this.score = 0;
  this.running = 0;
  this.total = 0;
  this.behavior = function(){};
}

Player.prototype.addRunning = function (amount) {
  this.running += amount;
  this.total = this.score + this.running;
};

Player.prototype.hold = function () {
  this.score += this.running;
  this.total = this.score;
  this.running = 0;
};

Player.prototype.loseTurn = function() {
  this.running = 0;
  this.total = this.score;
};


function Game() {}

Game.prototype.setPlayers = function (player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.currentPlayer = this.player1
};

Game.prototype.switchTurn = function() {
  if (this.currentPlayer === this.player1)
    this.currentPlayer = this.player2;
  else
    this.currentPlayer = this.player1;

  if (this.currentPlayer.name === "computer") {
    // do computer stuff
    console.log(this.currentPlayer)
    this.currentPlayer.behavior(this);
    this.switchTurn();
  }
}

Game.prototype.roll = function() {
  var number = Math.floor(Math.random() * Math.floor(6)) + 1;
  console.log(this.currentPlayer.name + " " + number);

  if (number === 1) {
    this.currentPlayer.loseTurn();
    this.switchTurn();
    updateScores(this);
    return false;
  } else {

    this.currentPlayer.addRunning(number);
    updateScores(this);
    return true;
  }
};

Game.prototype.hold = function() {
  this.currentPlayer.hold();
  updateScores(this);
  this.switchTurn();
};

function updateScores(game) {
  $(".p1Running").text(game.player1.running);
  $(".p1Score").text(game.player1.score);
  $(".p1Total").text(game.player1.total);
  $(".p2Running").text(game.player2.running);
  $(".p2Score").text(game.player2.score);
  $(".p2Total").text(game.player2.total);
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

function easyMode(game) {
  for (var i = 0; i < 3; i++) {
    if (!game.roll())
      break;
    game.hold();
  }
}


$(document).ready(function() {
  var game;

  $("#start-btn").click(function () {
    game = new Game();
    player1 = new Player($("#p1Mode").val());
    player2 = new Player($("#p2Mode").val());
    if($("#p1Mode").val() === "computer") {
      $("#p1roll").prop("disabled",true);
      $("#p1hold").prop("disabled",true);
      player1.behavior = easyMode;
    }
    if($("#p2Mode").val() === "computer") {
      $("#p2roll").prop("disabled",true);
      $("#p2hold").prop("disabled",true);
      player2.behavior = easyMode;
    }

    game.setPlayers(player1, player2);
    $(".start").hide();
    $("#game").fadeIn();
  });

  $("#roll").click(function() {
    game.roll();
  });

  $("#hold").click(function() {
    game.hold();
  });







  // $("#roll").click(function() {
  //   animateDice();
  //   var isOne = !roll(player);
  //   if (isOne) {
  //     player = switchTurn(player1, player2, player);
  //   }
  //
  //   updateScores(player1, player2);
  //
  //   if (player.total >= 100) {
  //     $("#result").text(player.name + " WINS!!!");
  //     $("#result").fadeIn();
  //     $("#game").hide();
  //     return;
  //   }
  //
  //
  // })
  // $("#hold").click(function() {
  //   player.addScore();
  //   updateScores(player1, player2);
  //   player = switchTurn(player1, player2, player);
  // })

});
