import React from 'react';
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
            initialBoard: this.props.board,
            board: 0,
            pills: []
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentDidMount() {
        if(this.state.board != undefined){
        setInterval(() => this.computeGame(), 500);
        }
    }
    computeGame() {
        //Generate empty board
        let board = [];
        for(let i = 0; i< this.state.initialBoard.length; i++) {
            let row = [];
            for(let j = 0;j< 8 ;j++){
                row.push(this.state.initialBoard[i][j]);
            }
            board.push(row);
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
            if (e.keyCode === 37) {
                this.setState({
                    curPill2X: this.state.curPill2X - 1,
                    curPill1X: this.state.curPill1X - 1,
                })
                //move pill to right
            } else if (e.keyCode === 39) {
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
                        orientation: 1
                    })
                } else if (this.state.orientation === 1) {
                    this.setState({
                        curPill2X: this.state.curPill2X - 1,
                        curPill2Y: this.state.curPill2Y + 1,
                        orientation: 2
                    })
                } else if (this.state.orientation === 2) {
                    this.setState({
                        curPill2X: this.state.curPill2X + 1,
                        curPill2Y: this.state.curPill2Y + 1,
                        orientation: 3
                    })
                } else if (this.state.orientation === 3) {
                    this.setState({
                        curPill2X: this.state.curPill2X + 1,
                        curPill2Y: this.state.curPill2Y - 1,
                        orientation: 0
                    })
                }
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
                if (this.state.board[i][j] === 1) {
                    row.push(<img className="pixel" src="b-left.png" alt="" />)
                }
                if (this.state.board[i][j] === 2) {
                    row.push(<img className="pixel" src="y-right.png" alt="" />)
                }
                if (this.state.board[i][j] === 4) {
                    row.push(<img className="pixel" src="r-virus.png" alt="" />)
                }
                if (this.state.board[i][j] === 5) {
                    row.push(<img className="pixel" src="b-virus.png" alt="" />)
                }
                if (this.state.board[i][j] === 6) {
                    row.push(<img className="pixel" src="y-virus.png" alt="" />)
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
                <div onKeyDown={this.handleKeyPress} tabIndex="0" className="main-grid">
                    {this.renderSquares()}
                </div>
            </div>
        )

    }
}
export default Game;