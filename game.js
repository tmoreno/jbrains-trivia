exports = typeof window !== "undefined" && window !== null ? window : global;

function Game () {
  var players          = new Array();
  var places           = new Array(6);
  var purses           = new Array(6);
  var inPenaltyBox     = new Array(6);

  var popQuestions     = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions  = new Array();
  var rockQuestions    = new Array();

  var currentPlayer    = 0;
  var isGettingOutOfPenaltyBox = false;
    
    var tablero = ['Pop', 'Science', 'Sports', 'Rock', 'Pop', 'Science', 'Sports', 'Rock', 'Pop', 'Science', 'Sports', 'Rock'];

  var didPlayerWin = function(){
    return !(purses[currentPlayer] == 6)
  };

  var currentCategory = function() {
      return tablero[places[currentPlayer]];
  };

  for(var i = 0; i < 50; i++){
    popQuestions.push("Pop Question "+i);
    scienceQuestions.push("Science Question "+i);
    sportsQuestions.push("Sports Question "+i);
    rockQuestions.push("Rock Question "+i);
  };

  this.isPlayable = function(howManyPlayers){
    return howManyPlayers >= 2;
  };

  this.add = function(playerName){
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function(){
    return players.length;
  };


  var askQuestion = function(){
    if(currentCategory() == 'Pop')
      console.log(popQuestions.shift());
    if(currentCategory() == 'Science')
      console.log(scienceQuestions.shift());
    if(currentCategory() == 'Sports')
      console.log(sportsQuestions.shift());
    if(currentCategory() == 'Rock')
      console.log(rockQuestions.shift());
  };

    this.roll = function(roll) {
        console.log(players[currentPlayer] + " is the current player");
        console.log("They have rolled a " + roll);

        if (inPenaltyBox[currentPlayer]) {
            if (esImpar(roll)) {
                isGettingOutOfPenaltyBox = true;
                console.log(players[currentPlayer] + " is getting out of the penalty box");
                
                avanzar(roll);
                
                console.log("The category is " + currentCategory());
                askQuestion();
            }
            else {
                console.log(players[currentPlayer] + " is not getting out of the penalty box");
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
        places[currentPlayer] = places[currentPlayer] + roll;
        
        if(places[currentPlayer] > 11) {
            places[currentPlayer] = places[currentPlayer] - 12;
        }
        
        console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
    }

    this.wasCorrectlyAnswered = function() {
        if(inPenaltyBox[currentPlayer] && !isGettingOutOfPenaltyBox){
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
        console.log('Question was incorrectly answered');
		console.log(players[currentPlayer] + " was sent to the penalty box");
        
		inPenaltyBox[currentPlayer] = true;

        siguienteTurno();
        
		return true;
    };
    
    function ganarMoneda() {
        purses[currentPlayer] += 1;
        console.log(players[currentPlayer] + " now has " + purses[currentPlayer]  + " Gold Coins.");
    }
    
    function siguienteTurno() {
        currentPlayer += 1;
        
        if(currentPlayer == players.length) {
            currentPlayer = 0;
        }   
    }
};

module.exports = Game;