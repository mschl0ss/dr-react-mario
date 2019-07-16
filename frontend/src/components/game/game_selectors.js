export const extractBoard = state => {
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