import React from 'react';

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            colors: ['red', 'yellow', 'blue'],
            viruses: {
                count: 5,
            },
            pills: {
                count: 10,
            },
            blanks: {
                count: 0,
            },
            boardSquares: [],
            board: [],
        }

    }

    componentDidMount() {
        this.renderBoard();
    }

    componentDidUpdate() {
        if (this.state.boardSquares.length === 160) {
            
        }
    }

    generateSquares() {
        const virusSquares = [];
        const virusCount = this.state.viruses.count;

        for (let i=0; i<virusCount; i++) {
            virusSquares.push({ 
                id: this.guidGenerator(), 
                type: 'virus', 
                color: this.state.colors[Math.floor(Math.random() * 3)], 
                siblingPillId: null })
        }

        const blankSquares = [];
        const blankCount = 160 - virusCount

        for (let i = 0; i < blankCount; i++) {
            blankSquares.push({
                id: this.guidGenerator(),
                type: 'blank',
                color: 'none',
                siblingPillId: null
            })
        }
        // debugger;
        const boardSquares = this.shuffle(virusSquares.concat(blankSquares));
        // console.log(boardSquares)
        // this.setState({boardSquares: boardSquares})

        return boardSquares;

        // 
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
   
    populateBoard() {
        const squares = this.generateSquares();
        const usedPicks = [];
        const board = [];
        // debugger;
        for(let col=0; col < 8; col++) {
            const thisRow = [];
           for(let row=0; row < 20; row++) {

                let pick = Math.floor(Math.random() *16);
                while(usedPicks.includes(pick)) {
                    pick = Math.floor(Math.random() * 160);
                    
                }
                if( !squares[pick]) {
                    debugger;
                }
                usedPicks.push(pick);
                thisRow.push(squares[pick]);
            }
            // console.log(`pushing ${thisRow} into board: ${board}`)
            board.push(thisRow);
        }


        // this.setState({board: board});
        console.log(board)
        return board;
    }

    renderBoard() {
        // debugger;
        const ulStyle={ display: 'flex', listStyle: 'none'}
        const liStyle={ border: 'solid', height: '100px', width: '50px'}
        return this.populateBoard().map((row, i) => {
            // console.log(row)
            return (
                <ul key={i} style={ulStyle}>
                    
                    {row.map(square => (
                        <li style={listStyle} key={square.id}>{square.type} {square.color}</li>
                    ))}
                </ul>
            )
        
        });
    }
    guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    render() {
        // this.generateSquares();
        // this.populateBoard();
    //    this.renderBoard();
        return (
            <div>
                {this.renderBoard()}
            </div>
        )
    }
}

export default Board;