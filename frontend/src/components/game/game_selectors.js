export const extractBoard = state => {
    if (state.game.initialState.length === 0 ) return [];
    let board = [];
    for(let i = 0; i < 20; i++) {
        let row = [];
        for(let j = 0; j< 8; j++) {
            if(state.game.initialState[i][j] === "blank") {
                row.push(0);
            } else if (state.game.initialState[i][j] === "red") {
                row.push(4);
            }else if (state.game.initialState[i][j] === "blue") {
                row.push(5);
            }else if (state.game.initialState[i][j] === "yellow") {
                row.push(6);
            }
        }
        board.push(row);
    }
    return board;
}

//blue is 1
//red is 3
//yellow is 2

//! COLOR NUMBER CODE: 

//? COLORS WITH NAME VALUES
// const morse = {
//     0: {left: 'blue', right: 'blue'}, 
//     1: {left: 'red', right: 'red'}, 
//     2: {left: 'yellow', right: 'yellow'}, 
//     3: {left: 'blue', right: 'yellow'}, 
//     4: {left: 'blue', right: 'red'}, 
//     5: {left: 'red', right: 'blue'}, 
//     6: {left: 'red', right: 'yellow'}, 
//     7: {left: 'yellow', right: 'blue'}, 
//     8: {left: 'yellow', right: 'red'}, 
//     9: { left: 'blue', right: 'blue' }
// }

//? COLORS WITH NUMERICAL VALUES

const morseNum = {
    0: {left: 1, right: 1}, 
    1: {left: 3, right: 3}, 
    2: {left: 2, right: 2}, 
    3: {left: 1, right: 2}, 
    4: {left: 1, right: 3}, 
    5: {left: 3, right: 1}, 
    6: {left: 3, right: 2}, 
    7: {left: 2, right: 1}, 
    8: {left: 2, right: 3}, 
    9: {left: 1, right: 1}
}


export const pillOrder = state => {
    let colors = [];
    state.game.seedValues.forEach((el) => (
        colors.push(morseNum[el])
    ))
    return colors; 
}

