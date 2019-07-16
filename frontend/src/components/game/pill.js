import Cell from './cell'; 

class Pill extends Cell {

    constructor(x, y, z, color, orientation) {
        super(x, y, z, color)
        orientation = this.orientation; 
    }
    
}

export default Pill; 

