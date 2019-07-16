import React from 'react';
import io from "socket.io-client";
// import Cell from './cell'

// Pill structure:
// {
//     x: x postiion,
//     y: y postiion,
//     color: pill color
// }
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pillFalling: false,
            curPill1X: 3,
            curPill1Y: 0,
            curPill1C: 1,
            curPill2X: 4,
            curPill2Y: 0,
            curPill2C: 2,
            orientation: 0,
            board: 0,
            pills: [],
            currentPlayer: 0
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.checkCombo = this.checkCombo.bind(this);
    }
    componentDidMount() {
              
      const socket = io('http://localhost:5000')
   
        socket.on("FromAPI", (data) => {
            this.setState({ pillFalling: data.pillFalling, curPill1X: data.curPill1X, curPill1Y: data.curPill1Y, curPill2C: data.curPill2C, 
            curPill2X: data.curPill2X, curPill2Y: data.curPill2Y, curPill1C: data.curPill1C, 
            board: data.board, pills: data.pills, orientation: data.orientation});
              });
        this.send();
        
        socket.on("change_player", (data) => {
            this.setState({ currentPlayer: data.currentPlayer })
        });
        // debugger;
        setInterval(() => this.computeGame(), 200);
      }
    // sendPlayerChange = () => {
    //     const socket = io("http://localhost:5000")
    //     const  { currentPlayer } = this.state
    //     // debugger;
    //     socket.emit('player_change', { data: { currentPlayer }});
        
    // }
    send = () => {
        const socket = io('http://localhost:5000')
        const { pillFalling, curPill1X, curPill1Y, curPill2C, curPill2X, curPill2Y, curPill1C, board, pills, orientation } = this.state;
        socket.emit('toAPI', { data: { pillFalling, curPill1X, curPill1Y, curPill2C, curPill2X, curPill2Y, curPill1C, board, pills, orientation} })
    }
    computeGame() {
        //Generate empty board
        let board = [];
        for (let i = 0; i < 20; i++) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                row.push(0)
            }
            board.push(row)
        }
        //update current pill position
        if (this.state.pillFalling === false) {
            //if there is no pill falling, set new piil
            board[this.state.curPill1Y][this.state.curPill1X] = 1;
            board[this.state.curPill2Y][this.state.curPill2X] = 2;

            this.setState({
                curPill1X: 3,
                curPill1Y: 0,
                curPill2X: 4,
                curPill2Y: 0,
                pillFalling: true,
                orientation: 0
            });

        } else {
            //if pill is falling, update it's position
            this.setState({
                curPill1X: this.state.curPill1X,
                curPill1Y: this.state.curPill1Y + 1,
                curPill2X: this.state.curPill2X,
                curPill2Y: this.state.curPill2Y + 1
            });

            board[this.state.curPill1Y][this.state.curPill1X] = 1;
            board[this.state.curPill2Y][this.state.curPill2X] = 2;
            this.checkCollisionWithPills(this.state);
            
            // this.sendPlayerChange();
        }
        // if pill hit the bottom of the board
        if (this.state.curPill1Y === 19 || this.state.curPill2Y === 19) {
            let pills = this.state.pills;
            //? if x and y relate to positions, wouldnt it be easier to store them as one: like {pos: [this.state.curPill1X, this.state.curPill1Y] color: color:this.state.curPill1C}
            pills.push({ x: this.state.curPill1X, y: this.state.curPill1Y, color: this.state.curPill1C })
            pills.push({ x: this.state.curPill2X, y: this.state.curPill2Y, color: this.state.curPill2C })
            this.setState({
                pillFalling: false,
                curPill1Y: 0,
                curPill2Y: 0,
                pills: pills
            })
        }
        //update board position for all pills
        for (let i = 0; i < this.state.pills.length; i++) {
            let pill = this.state.pills[i];
            board[pill.y][pill.x] = pill.color;
        }
        this.checkCombo()
        
        this.setState({
            board: board
        })

    }
    //check for pills colliding with pills
    checkCollisionWithPills(state) {
        let pills = this.state.pills;
        let pillFalling = true;
        for (let i = 0; i < state.pills.length; i++) {
            let pill = state.pills[i];
            if ((state.curPill1X === pill.x && state.curPill1Y + 1 === pill.y) ||
                (state.curPill2X === pill.x && state.curPill2Y + 1 === pill.y) ||
                state.curPill1Y === 19 ||
                state.curPill2Y === 19) {
                pills.push({ x: this.state.curPill1X, y: this.state.curPill1Y, color: this.state.curPill1C })
                pills.push({ x: this.state.curPill2X, y: this.state.curPill2Y, color: this.state.curPill2C })
                pillFalling = false;
                
                
                this.setState({
                    pills: pills,
                    pillFalling: pillFalling //? you mean pillFalling: false
                })
                return;

            }
        }
        

    }
    handleKeyPress(e) {
        let nextState = {};
        if (this.state.pillFalling) {
            //move pill to left
            if (e.keyCode === 37) {
                nextState = {
                    curPill2X: this.state.curPill2X - 1,
                    curPill1X: this.state.curPill1X - 1,
                }
                //move pill to right
            } else if (e.keyCode === 39) {
                nextState = {
                    curPill2X: this.state.curPill2X + 1,
                    curPill1X: this.state.curPill1X + 1,
                }
            }
            //when z is pressed rotate the pill
            else if (e.keyCode === 90) {
                //left rotate
                if (this.state.orientation === 0) {
                    nextState = {
                        curPill2X: this.state.curPill2X - 1,
                        curPill2Y: this.state.curPill2Y - 1,
                        orientation: 1
                    }
                } else if (this.state.orientation === 1) {
                    nextState = {
                        curPill2X: this.state.curPill2X - 1,
                        curPill2Y: this.state.curPill2Y + 1,
                        orientation: 2
                    }
                } else if (this.state.orientation === 2) {
                    nextState = {
                        curPill2X: this.state.curPill2X + 1,
                        curPill2Y: this.state.curPill2Y + 1,
                        orientation: 3
                    }
                } else if (this.state.orientation === 3) {
                    nextState = {
                        curPill2X: this.state.curPill2X + 1,
                        curPill2Y: this.state.curPill2Y - 1,
                        orientation: 0
                    }
                }
            }
            this.setState(nextState, () => {

               this.send();
            });
        }
    }
    checkCombo() {

        let curCount = 0;
        let curColor = 0;

        //check rows
        for (let i = 0; i < this.state.board.length; i++) {
            let curRow = this.state.board[i];
            curCount = 0;
            curColor = 0;
            for (let j = 0; j < curRow.length; j++) {
                if (curRow[j] != 0) {
                    if (curCount === 0) {
                        curColor = curRow[j];
                        curCount += 1;
                    } else {
                        if (curColor === curRow[j]) {
                            curCount += 1;
                        } else {
                            curCount = 1;
                            curColor = curRow[j];
                        }
                    }
                    if (curCount === 4) {
                        console.log("4 in a row")

                    }
                } else {
                    curCount = 0;
                    curColor = 0;
                }
            }
        }

        //check columns
        if (this.state.board !== 0) {

            let pills = this.state.pills;
            let pillFalling = this.state.pillFalling;
            for (let i = 0; i < 8; i++) {
                curCount = 0;
                curColor = 0;
                for (let j = 0; j < this.state.board.length; j++) {
                    if (this.state.board[j][i] !== 0) {
                        if (curCount === 0) {
                            curColor = this.state.board[j][i];
                            curCount += 1;
                        } else {
                            if (curColor === this.state.board[j][i]) {
                                curCount += 1;
                            } else {
                                curCount = 1;
                                curColor = this.state.board[j][i];
                            }
                        }
                        if (curCount === 4) {

                            for (let z = 0; z < pills.length; z++) {
                                if ((pills[z].x === i && pills[z].y) === j ||
                                    (pills[z].x === i && pills[z].y) === j - 1 ||
                                    (pills[z].x === i && pills[z].y) === j - 2 ||
                                    (pills[z].x === i && pills[z].y) === j - 3) {
                                    pills.splice(z, 1);
                                    z = 0
                                }
                            }
                            curCount = 0;
                            curColor = 0;


                        }
                    } else {
                        curCount = 0;
                        curColor = 0;
                    }
                }
            }
            
            this.setState({
                pills: pills,
                pillFalling: pillFalling
            })
        }
    }


    renderSquares() {
        let row = [];
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.state.board[i][j] === 0) {
                    row.push(<div></div>)
                }
                if (this.state.board[i][j] === 1) {
                    row.push(<img className="pixel" src="b-left.png" alt="" />)
                }
                if (this.state.board[i][j] === 2) {
                    row.push(<img className="pixel" src="y-right.png" alt="" />)
                }
            }
        }
        return row;
    }
    render() {
        if (this.state.board === 0) {
            return <div></div>
        }
        
        return (
            <div id="content">
                <h1>Player {this.state.currentPlayer}'s turn</h1>
                <div onKeyDown={this.handleKeyPress} tabIndex="0" className="main-grid">
                    {this.renderSquares()}
                </div>
            </div>
        )

    }
}
export default Game;