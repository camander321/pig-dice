function Player() {
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

function roll() {
  var number = Math.floor(Math.random() * Math.floor(6)) + 1;
  $("#showRoll").text(number);
  return number;
}

var player = new Player();
$(document).ready(function() {


  $("#roll").click(function() {
    var newRoll = roll();
    player.addRunning(newRoll);
    if (newRoll === 1) {
      player.running = 0;
    }

  $(".p1Running").text(player.running)

  })
  $("#hold").click(function() {
    player.addScore();
  })

});
