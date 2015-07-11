function Tablero(tablero) {
    var tablero = tablero;
    
    this.currentCategory = function(posicion) {
        return tablero[posicion];
    }
}

module.exports = Tablero;