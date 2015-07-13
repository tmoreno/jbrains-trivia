var Game = require('./game');
var randomSeed = require('random-seed');

var rollRandom = randomSeed.create();
rollRandom.initState();

var answerRandom = randomSeed.create();
answerRandom.initState();

var tablero = ['Pop', 'Science', 'Sports', 'Rock', 'Pop', 'Science', 'Sports', 'Rock', 'Pop', 'Science', 'Sports', 'Rock'];
var questions = {
    Pop: {
        text: 'Pop Question',
        number: 50
    },
    Science: {
        text: 'Science Question',
        number: 50
    },
    Sports: {
        text: 'Sports Question',
        number: 50
    },
    Rock: {
        text: 'Rock Question',
        number: 50
    }
};

var game = new Game(tablero, questions);
game.add('Chet');
game.add('Pat');
game.add('Sue');

var notAWinner = false;
do {
    game.roll(rollRandom(6) + 1);

    if(answerRandom(10) + 1 == 7){
        notAWinner = game.wrongAnswer();
    }
    else{
        notAWinner = game.wasCorrectlyAnswered();
    }
} while(notAWinner);