var Tablero = require('./tablero');

function Game () {
    var players          = new Array();
    var places           = new Array(6);
    var purses           = new Array(6);
    var inPenaltyBox     = new Array(6);

    var currentPlayerIndex    = 0;
    var isGettingOutOfPenaltyBox = false;
    
    var tablero = new Tablero(['Pop', 'Science', 'Sports', 'Rock', 'Pop', 'Science', 'Sports', 'Rock', 'Pop', 'Science', 'Sports', 'Rock']);

    var didPlayerWin = function(){
        return !(purses[currentPlayerIndex] == 6)
    };

    var currentCategory = function() {
        return tablero.currentCategory([places[currentPlayerIndex]]);
    };
    
    questions = {
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

    this.isPlayable = function(howManyPlayers) {
        return howManyPlayers >= 2;
    };

    this.add = function(playerName) {
        players.push(playerName);
        places[this.howManyPlayers() - 1] = 0;
        purses[this.howManyPlayers() - 1] = 0;
        inPenaltyBox[this.howManyPlayers() - 1] = false;

        console.log(playerName + " was added");
        console.log("They are player number " + players.length);

        return true;
    };

    this.howManyPlayers = function() {
        return players.length;
    };

    var askQuestion = function() {
        var question = questions[currentCategory()];
      
        console.log(question.text + ' ' + (50 - question.number));
        
        question.number--;
    };

    this.roll = function(roll) {
        var currentPlayer = players[currentPlayerIndex];
        
        console.log(currentPlayer + " is the current player");
        console.log("They have rolled a " + roll);

        if (inPenaltyBox[currentPlayerIndex]) {
            if (esImpar(roll)) {
                isGettingOutOfPenaltyBox = true;
                console.log(currentPlayer + " is getting out of the penalty box");
                
                avanzar(roll);
                
                console.log("The category is " + currentCategory());
                askQuestion();
            }
            else {
                console.log(currentPlayer + " is not getting out of the penalty box");
                isGettingOutOfPenaltyBox = false;
            }
        }
        else {
            avanzar(roll);

            console.log("The category is " + currentCategory());
            askQuestion();
        }
    };
    
    function esImpar(roll) {
        return roll % 2 != 0;
    }
    
    function avanzar(roll) {
        var currentPlayer = players[currentPlayerIndex];
        
        places[currentPlayerIndex] = places[currentPlayerIndex] + roll;
        
        if(places[currentPlayerIndex] > 11) {
            places[currentPlayerIndex] = places[currentPlayerIndex] - 12;
        }
        
        console.log(currentPlayer + "'s new location is " + places[currentPlayerIndex]);
    }

    this.wasCorrectlyAnswered = function() {
        if(inPenaltyBox[currentPlayerIndex] && !isGettingOutOfPenaltyBox){
            siguienteTurno();
            return true;
        }
        else {
            console.log("Answer was correct!!!!");

            ganarMoneda();

            var winner = didPlayerWin();

            siguienteTurno();

            return winner;
        }
    };
    
    this.wrongAnswer = function() {
        var currentPlayer = players[currentPlayerIndex];
        
        console.log('Question was incorrectly answered');
		console.log(currentPlayer + " was sent to the penalty box");
        
		inPenaltyBox[currentPlayerIndex] = true;

        siguienteTurno();
        
		return true;
    };
    
    function ganarMoneda() {
        var currentPlayer = players[currentPlayerIndex];
        
        purses[currentPlayerIndex] += 1;
        console.log(currentPlayer + " now has " + purses[currentPlayerIndex]  + " Gold Coins.");
    }
    
    function siguienteTurno() {
        currentPlayerIndex += 1;
        
        if(currentPlayerIndex == players.length) {
            currentPlayerIndex = 0;
        }   
    }
};

module.exports = Game;