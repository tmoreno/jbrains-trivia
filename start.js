var Game = require('./game');
var randomSeed = require('random-seed');

var rollRandom = randomSeed.create();
rollRandom.initState();

var answerRandom = randomSeed.create();
answerRandom.initState();

var notAWinner = false;

var game = new Game();
game.add('Chet');
game.add('Pat');
game.add('Sue');

do{
  game.roll(rollRandom(6) + 1);

  if(answerRandom(10) + 1 == 7){
    notAWinner = game.wrongAnswer();
  }else{
    notAWinner = game.wasCorrectlyAnswered();
  }

}while(notAWinner);
