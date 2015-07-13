function Jugador(nombre) {
    var nombre = nombre;
    var place = 0;
    var purses = 0;
    var inPenaltyBox = false;
    
    this.didPlayerWin = function() {
        return purses !== 6;
    };
    
    this.avanzar = function(roll) {
        place += roll;
        
        if(place > 11) {
            place = place - 12;
        }
        
        console.log(nombre + "'s new location is " + place);
    }
    
    this.getNombre = function () {
        return nombre;
    }
    
    this.setPlace = function (value) {
        place = value;
    }
    
    this.getPlace = function () {
        return place;
    }
    
    this.addPurse = function () {
        purses++;
        
        console.log(nombre + " now has " + purses + " Gold Coins.");
    }
    
    this.getPurses = function () {
        return purses;
    }
    
    this.setInPenaltyBox = function (value) {
        inPenaltyBox = value;
    }
    
    this.isInPenaltyBox = function () {
        return inPenaltyBox;
    }
}

module.exports = Jugador;