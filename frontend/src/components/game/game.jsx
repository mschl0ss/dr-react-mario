import React from 'react';
// import Cell from './cell'

// Pill structure:
// {
//     x: x postiion,
//     y: y postiion,
//     color: pill color,
//     orientation: HR, HL, VU, VD 
// }
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pillFalling: false,
            curPill1X: 3,
            curPill1Y: 0,
            curPill1C: 1,
            curPill10: 'HL',
            curPill2X: 4,
            curPill2Y: 0,
            curPill2C: 2,
            curPill20: 'HR',
            orientation: 0,
            board: 0,
            pills: []
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        setInterval(() => this.computeGame(), 400);
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

        }

        // if pill hit the bottom of the board
        if (this.state.curPill1Y === 19 || this.state.curPill2Y === 19) {
            let pills = this.state.pills;

            //? if x and y relate to positions, wouldnt it be easier to store them as one: like {pos: [this.state.curPill1X, this.state.curPill1Y] color: color:this.state.curPill1C}

            pills.push({ x: this.state.curPill1X, y: this.state.curPill1Y, color: this.state.curPill1C, falling: false })

            pills.push({ x: this.state.curPill2X, y: this.state.curPill2Y, color: this.state.curPill2C, falling: false })
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



        // this.checkCombo()
        // this.updatePills();

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
        if (this.state.pillFalling) {
            //move pill to left
            if (e.keyCode === 37 && this.state.curPill1X !== 0 && this.state.curPill2X !== 0 ) {
                this.setState({
                    curPill2X: this.state.curPill2X - 1,
                    curPill1X: this.state.curPill1X - 1,
                })
                //move pill to right
            } else if (e.keyCode === 39 && this.state.curPill1X !== 7 && this.state.curPill2X !== 7 ) {
                this.setState({
                    curPill2X: this.state.curPill2X + 1,
                    curPill1X: this.state.curPill1X + 1,
                })
            }
            //when z is pressed rotate the pill
            else if (e.keyCode === 90) {
                //left rotate
                if (this.state.orientation === 0) {
                    this.setState({
                        curPill2X: this.state.curPill2X - 1,
                        curPill2Y: this.state.curPill2Y - 1,
                        curPill10: 'VD',
                        curPill20: 'VU',
                        orientation: 1
                    })
                } else if (this.state.orientation === 1) {
                    this.setState({
                        curPill2X: this.state.curPill2X - 1,
                        curPill2Y: this.state.curPill2Y + 1,
                        curPill10: 'HR',
                        curPill20: 'HL',
                        orientation: 2
                    })
                } else if (this.state.orientation === 2) {
                    this.setState({
                        curPill2X: this.state.curPill2X + 1,
                        curPill2Y: this.state.curPill2Y + 1,
                        curPill10: 'VU',
                        curPill20: 'VD',
                        orientation: 3
                    })
                } else if (this.state.orientation === 3) {
                    this.setState({
                        curPill2X: this.state.curPill2X + 1,
                        curPill2Y: this.state.curPill2Y - 1,
                        curPill10: 'HL',
                        curPill20: 'HR',
                        orientation: 0
                    })
                }
                // this.computeGame();
            }
        }
    }



    renderSquares() {
        let row = [];

        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.state.board[i][j] === 0) {
                    row.push(<div></div>)
                }
                if (this.state.board[i][j] === 1 ) {
                    row.push(<img className="pixel" src="b-left.png" alt="" />)
                }
                if (this.state.board[i][j] === 2) {
                    row.push(<img className="pixel" src="y-right.png" alt="" />)
                }
            }
        }
        return row;
    }

    renderSqrs() {
        let rows = []; 
        let board = this.state.board; 
        let pillOrientation1 = this.state.curPill10; 
        let pillOrientation2 = this.state.curPill20; 

        for (let row = 0; row < 20; row ++) {
            for (let col = 0; col < 8; col ++) {
                if (board[row][col] === 0 ) {
                    rows.push(<div></div>)
                }
                if (board[row][col] === 1 && pillOrientation1 === 'HL') { //* BLUE LEFT
                    rows.push(<img className="pixel" src="b-left.png" alt="" />)
                }
                if (board[row][col] === 1 && pillOrientation1 === 'HR') { //* BLUE RIGHT
                    rows.push(<img className="pixel" src="b-right.png" alt="" />)
                }
                if (board[row][col] === 1 && pillOrientation1 === 'VU') { //* BLUE UP
                    rows.push(<img className="pixel" src="b-up.png" alt="" />)
                }
                if (board[row][col] === 1 && pillOrientation1 === 'VD') { //* BLUE DOWN
                    rows.push(<img className="pixel" src="b-down.png" alt="" />)
                }
                if (board[row][col] === 2 && pillOrientation2 === 'HL') { //* YELLOW LEFT
                    rows.push(<img className="pixel" src="y-left.png" alt="" />)
                }
                if (board[row][col] === 2 && pillOrientation2 === 'HR') { //* YELLOW LEFT
                    rows.push(<img className="pixel" src="y-right.png" alt="" />)
                }
                if (board[row][col] === 2 && pillOrientation2 === 'VU') { //* YELLOW UP
                    rows.push(<img className="pixel" src="y-up.png" alt="" />)
                }
                if (board[row][col] === 2 && pillOrientation2 === 'VD') { //* YELLOW DOWN
                    rows.push(<img className="pixel" src="y-down.png" alt="" />)
                }

            }   
        }
        return rows; 
    }




    render() {
        if (this.state.board === 0) {
            return <div></div>
        }


        return (
            <div id="content">
                <div onKeyDown={this.handleKeyPress} tabIndex="0" className="main-grid">
                    {this.renderSqrs()}
                </div>
            </div>
        )

    }
}
export default Game;