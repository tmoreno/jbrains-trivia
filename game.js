var Jugador = require('./jugador');

function Game(tablero, questions) {
    var players = new Array();
    var currentPlayerIndex = 0;
    
    var isGettingOutOfPenaltyBox = false;
    
    var currentCategory = function() {
        var currentPlayer = players[currentPlayerIndex];
        
        return tablero[currentPlayer.getPlace()];
    };
    
    this.add = function(playerName) {
        var jugador = new Jugador(playerName);
        
        players.push(jugador);
        
        console.log(jugador.getNombre() + " was added");
        console.log("They are player number " + players.length);

        return true;
    };

    var askQuestion = function() {
        var question = questions[currentCategory()];
      
        console.log(question.text + ' ' + (50 - question.number));
        
        question.number--;
    };

    this.roll = function(roll) {
        var currentPlayer = players[currentPlayerIndex];
        
        console.log(currentPlayer.getNombre() + " is the current player");
        console.log("They have rolled a " + roll);

        if (currentPlayer.isInPenaltyBox()) {
            if (esImpar(roll)) {
                isGettingOutOfPenaltyBox = true;
                console.log(currentPlayer.getNombre() + " is getting out of the penalty box");
                
                avanzar(roll);
                
                console.log("The category is " + currentCategory());
                askQuestion();
            }
            else {
                console.log(currentPlayer.getNombre() + " is not getting out of the penalty box");
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
        
        currentPlayer.setPlace(currentPlayer.getPlace() + roll);
        
        if(currentPlayer.getPlace() > 11) {
            currentPlayer.setPlace(currentPlayer.getPlace() - 12);
        }
        
        console.log(currentPlayer.getNombre() + "'s new location is " + currentPlayer.getPlace());
    }

    this.wasCorrectlyAnswered = function() {
        var currentPlayer = players[currentPlayerIndex];
            
        if(currentPlayer.isInPenaltyBox() && !isGettingOutOfPenaltyBox){
            siguienteTurno();
            return true;
        }
        else {
            console.log("Answer was correct!!!!");

            ganarMoneda();

            var winner = currentPlayer.didPlayerWin();

            siguienteTurno();

            return winner;
        }
    };
    
    this.wrongAnswer = function() {
        var currentPlayer = players[currentPlayerIndex];
        
        console.log('Question was incorrectly answered');
		console.log(currentPlayer.getNombre() + " was sent to the penalty box");
        
        currentPlayer.setInPenaltyBox(true);

        siguienteTurno();
        
		return true;
    };
    
    function ganarMoneda() {
        var currentPlayer = players[currentPlayerIndex];
        
        currentPlayer.addPurse();
        console.log(currentPlayer.getNombre() + " now has " + currentPlayer.getPurses() + " Gold Coins.");
    }
    
    function siguienteTurno() {
        currentPlayerIndex += 1;
        
        if(currentPlayerIndex == players.length) {
            currentPlayerIndex = 0;
        }   
    }
};

module.exports = Game;