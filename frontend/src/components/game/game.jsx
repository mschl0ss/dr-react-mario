import React from 'react';
import io from 'socket.io-client';
// import Cell from './cell'

// Pill structure:
// {
//     x: x postiion,
//     y: y postiion,
//     color: pill color,
//     orientation: HR, HL, VU, VD 
// }

let socketURL = 'http://localhost:5000';
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pillFalling: false,
            curPill1X: 3,
            curPill1Y: 0,
            curPill1C: this.props.colors[0].left, // Changed
            curPill10: 'HL',
            curPill2X: 4,
            curPill2Y: 0,
            curPill2C: this.props.colors[0].right,
            curPill20: 'HR',
            orientation: 0,
            initialBoard: this.props.board,
            board: 0,
            pills: [],
            multiplayer: false,
         
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.checkCombo = this.checkCombo.bind(this);
    }

    openRoom(){
        const socket = io(socketURL);
        // const socket = io('http://localhost:5000');
        
        if (process.env.NODE_ENV === "production") {
            socketURL = "https://starfight.herokuapp.com/";
        }
        let { game } = this.props.gameName;
        socket.emit("open_room", {data: game})
    }
    componentDidMount() {
        if (this.state.board !== undefined) {
            
            this.openRoom();
            setInterval(() => this.computeGame(), 500);
            const socket = io('http://localhost:5000');
            socket.on("FromAPI", (data) => {
                this.setState({
                    pillFalling: data.pillFalling, curPill1X: data.curPill1X, curPill1Y: data.curPill1Y, curPill2C: data.curPill2C,
                    curPill2X: data.curPill2X, curPill2Y: data.curPill2Y, curPill1C: data.curPill1C,
                    board: data.board, pills: data.pills, orientation: data.orientation, initialBoard: data.initialBoard,
                    curPill20: data.curPill20, curPill10: data.curPill10
                });
            });
            this.send();
        }

    }
    send = () => {
        const socket = io('http://localhost:5000');
        const { pillFalling, curPill1X, curPill1Y, curPill2C, curPill2X, curPill2Y, curPill1C, board, pills, orientation, initialBoard, curPill10, curPill20 } = this.state;
        socket.emit('toAPI', { data: { pillFalling, curPill1X, curPill1Y, curPill2C, curPill2X, curPill2Y, curPill1C, board, pills, orientation, initialBoard, curPill10, curPill20 } })
    }


    computeGame() {
        //Generate empty board
        let board = [];
        for (let i = 0; i < this.state.initialBoard.length; i++) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                row.push(this.state.initialBoard[i][j]);
            }
            board.push(row);
        }

        //update current pill position
        if (this.state.pillFalling === false) {
            //if there is no pill falling, set new piil
            this.setState({
                curPill1C: this.props.colors.shift([0]).left, 
                curPill2C: this.props.colors.shift([0]).right
            })

            board[this.state.curPill1Y][this.state.curPill1X] = this.state.curPill1C;
            board[this.state.curPill2Y][this.state.curPill2X] = this.state.curPill2C;

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

            board[this.state.curPill1Y][this.state.curPill1X] = this.state.curPill1C;
            board[this.state.curPill2Y][this.state.curPill2X] = this.state.curPill2C;

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

        this.setState({
            board: board
        })


        this.checkCombo()

        this.setState({
            board: board
        })



    }

    updatePills() {
        let pills = this.state.pills;
        for (let i = 0; i < pills.length; i++) {
            if (pills[i].falling === true && pills[i].y < 19 && this.state.board[pills[i].y + 1][pills[i].x] === 0) {
                pills[i].y = pills[i].y + 1;
            }
        }
        this.setState({
            pills: pills
        })
    }
    dropColumn(i, j) {
        let board = this.state.board;
        let pills = this.state.pills;
        for (let x = 0; x < pills.length; x++) {
            if (pills[x].x === i && pills[x].y < j) {
                pills[x].falling = true;
            }
        }

        this.setState({
            pills: pills
        })

    }

    checkCombo() {
        let curCount = 0;
        let curColor = 0;

        //check rows
        let pills = this.state.pills
        for (let i = 0; i < this.state.board.length; i++) {
            let curRow = this.state.board[i];
            curCount = 0;
            curColor = 0;
            for (let j = 0; j < curRow.length; j++) {
                if (curRow[j] !== 0) {
                    if (curCount === 0) {
                        if (curRow[j] === 4) {
                            //set to red
                            curColor = 3;
                        } else if (curRow[j] === 5) {
                            //set to blue
                            curColor = 1;
                        } else if (curRow[j] === 6) {
                            //set to yellow
                            curColor = 2;
                        } else {
                            curColor = curRow[j];
                        }
                        curCount += 1;
                    } else {
                        if (curColor === curRow[j] ||
                            (curColor === 1 && curRow[j] === 5) ||
                            (curColor === 2 && curRow[j] === 6) ||
                            (curColor === 3 && curRow[j] === 4)
                        ) {
                            curCount += 1;
                        } else {
                            curCount = 1;
                            if (curRow[j] === 4) {
                                //set to red
                                curColor = 3;
                            } else if (curRow[j] === 5) {
                                //set to blue
                                curColor = 1;
                            } else if (curRow[j] === 6) {
                                //set to yellow
                                curColor = 2;
                            } else {
                                curColor = curRow[j];
                            }
                        }
                    }
                    if (curCount === 4) {
                        if (this.state.board[i][j] === 4 ||
                            this.state.board[i][j] === 5 ||
                            this.state.board[i][j] === 6) {
                            this.state.initialBoard[i][j] = 0;
                        }
                        if (this.state.board[i][j - 1] === 4 ||
                            this.state.board[i][j - 1] === 5 ||
                            this.state.board[i][j - 1] === 6) {
                            this.state.initialBoard[i][j - 1] = 0;
                        }
                        if (this.state.board[i][j - 2] === 4 ||
                            this.state.board[i][j - 2] === 5 ||
                            this.state.board[i][j - 2] === 6) {
                            this.state.initialBoard[i][j - 2] = 0;
                        }
                        if (this.state.board[i][j - 3] === 4 ||
                            this.state.board[i][j - 3] === 5 ||
                            this.state.board[i][j - 3] === 6) {
                            this.state.initialBoard[i][j - 3] = 0;
                        }
                        for (let z = 0; z < pills.length; z++) {

                            if ((pills[z].x === j - 1 && pills[z].y) === i ||
                                (pills[z].x === j - 2 && pills[z].y) === i ||
                                (pills[z].x === j - 3 && pills[z].y) === i ||
                                (pills[z].x === j && pills[z].y) === i) {

                                pills.splice(z, 1);
                                z = 0;

                            }
                        }
                        curCount = 0;
                        curColor = 0;
                        this.dropColumn(i, j);
                        this.dropColumn(i, j - 1);
                        this.dropColumn(i, j - 2);
                        this.dropColumn(i, j - 3);
                    }
                } else {
                    curCount = 0;
                    curColor = 0;
                }

            }

            this.setState({
                pills: pills
            })

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
                                if (this.state.board[j][i] === 4) {
                                    //set to red
                                    curColor = 3;
                                } else if (this.state.board[j][i] === 5) {
                                    //set to blue
                                    curColor = 1;
                                } else if (this.state.board[j][i] === 6) {
                                    //set to yellow
                                    curColor = 2;
                                } else {
                                    curColor = this.state.board[j][i];
                                }
                                curCount += 1;
                            } else {
                                if (curColor === this.state.board[j][i] ||
                                    (curColor === 1 && this.state.board[j][i] === 5) ||
                                    (curColor === 2 && this.state.board[j][i] === 6) ||
                                    (curColor === 3 && this.state.board[j][i] === 4)
                                ) {
                                    curCount += 1;
                                } else {
                                    curCount = 1;
                                    if (this.state.board[j][i] === 4) {
                                        //set to red
                                        curColor = 3;
                                    } else if (this.state.board[j][i] === 5) {
                                        //set to blue
                                        curColor = 1;
                                    } else if (this.state.board[j][i] === 6) {
                                        //set to yellow
                                        curColor = 2;
                                    } else {
                                        curColor = this.state.board[j][i];
                                    }
                                }
                            }
                            if (curCount === 4) {
                                if (this.state.board[j][i] === 4 ||
                                    this.state.board[j][i] === 5 ||
                                    this.state.board[j][i] === 6) {
                                    this.state.initialBoard[j][i] = 0;
                                }
                                if (this.state.board[j - 1][i] === 4 ||
                                    this.state.board[j - 1][i] === 5 ||
                                    this.state.board[j - 1][i] === 6) {
                                    this.state.initialBoard[j - 1][i] = 0;
                                }
                                if (this.state.board[j - 2][i] === 4 ||
                                    this.state.board[j - 2][i] === 5 ||
                                    this.state.board[j - 2][i] === 6) {
                                    this.state.initialBoard[j - 2][i] = 0;
                                }
                                if (this.state.board[j - 3][i] === 4 ||
                                    this.state.board[j - 3][i] === 5 ||
                                    this.state.board[j - 3][i] === 6) {
                                    this.state.initialBoard[j - 3][i] = 0;
                                }
                                for (let z = 0; z < pills.length; z++) {
                                    if ((pills[z].x === i && pills[z].y) === j ||
                                        (pills[z].x === i && pills[z].y) === j - 1 ||
                                        (pills[z].x === i && pills[z].y) === j - 2 ||
                                        (pills[z].x === i && pills[z].y) === j - 3) {

                                        pills.splice(z, 1);
                                        z = 0;

                                    }
                                    this.dropColumn(i, j)
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
    }


    
    



    //check for pills colliding with pills
    checkCollisionWithPills(state) {
        let pills = this.state.pills;
        let pillFalling = true;

        if (this.state.curPill1Y === 19 || this.state.curPill2Y === 19 || (this.state.board[this.state.curPill1Y + 1][this.state.curPill1X] !== 0) ||
            (this.state.board[this.state.curPill2Y + 1][this.state.curPill2X] !== 0)) {
                // debugger 
                pills.push({x:this.state.curPill1X, y:this.state.curPill1Y,color:this.state.curPill1C})
                pills.push({x:this.state.curPill2X, y:this.state.curPill2Y, color:this.state.curPill2C})
                pillFalling = false;
                
                
                this.setState({
                    pills: pills,
                    pillFalling: pillFalling 
                })
            return;
        }
    }
    
    // TODO => Add this for horizontal collisions (this.state.curPill1Y === pill.y && this.state.curPill1X + 1 === pill.x) || (this.state.curPill2Y === pill.y && this.state.curPill2X + 1 === pill.x)

    handleKeyPress(e) {
        // debugger 
        let nextState = {};
        if (this.state.pillFalling) {
            //move pill to left

            if (e.keyCode === 37 && this.state.curPill1X !== 0 && this.state.curPill2X !== 0 &&
                this.state.board[this.state.curPill1Y][this.state.curPill1X - 1] === 0) {

                nextState = {
                    curPill2X: this.state.curPill2X - 1,
                    curPill1X: this.state.curPill1X - 1,
                }

                //move pill to right
            } else if (e.keyCode === 39 && this.state.curPill1X !== 7 && this.state.curPill2X !== 7 &&
                this.state.board[this.state.curPill2Y][this.state.curPill2X + 1] === 0) {

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
                        curPill10: 'VD',
                        curPill20: 'VU',
                        orientation: 1
                    }
                } else if (this.state.orientation === 1) {
                    nextState = {
                        curPill2X: this.state.curPill2X - 1,
                        curPill2Y: this.state.curPill2Y + 1,
                        curPill10: 'HR',
                        curPill20: 'HL',
                        orientation: 2
                    }
                } else if (this.state.orientation === 2) {
                    nextState = {
                        curPill2X: this.state.curPill2X + 1,
                        curPill2Y: this.state.curPill2Y + 1,
                        curPill10: 'VU',
                        curPill20: 'VD',
                        orientation: 3
                    }
                } else if (this.state.orientation === 3) {
                    nextState = {
                        curPill2X: this.state.curPill2X + 1,
                        curPill2Y: this.state.curPill2Y - 1,
                        curPill10: 'HL',
                        curPill20: 'HR',
                        orientation: 0
                    }
                }
                // this.computeGame();
            }
            this.setState(nextState, () => {
                this.send();
            })
        }
    }



    renderSqrs() {
        let rows = []; 
        let board = this.state.board; 
        let pillOrientation1 = this.state.curPill10; 
        let pillOrientation2 = this.state.curPill20; 
        let style={background: "orange"}

        for (let row = 0; row < 20; row ++) {
            for (let col = 0; col < 8; col ++) {
                if (board[row][col] === 0 ) {
                    rows.push(<div></div>)
                }
                if (board[row][col] === 1 ) { //* BLUE LEFT
                    // rows.push(<img className="pixel" src="b-left.png" alt="" />)
                    rows.push(<div className="pixel pill blue"/>)
                }
               
                if (board[row][col] === 2) { //* YELLOW LEFT
                    // rows.push(<img className="pixel" src="y-left.png" alt="" />)
                    rows.push(<div className="pixel pill yellow" />)
                }
                
                if (board[row][col] === 3 && pillOrientation2) { //* RED LEFT
                    // rows.push(<img className="pixel" src="r-left.png" alt="" />)
                    rows.push(<div className="pixel pill red" />)
                }
                  
                if (this.state.board[row][col] === 4) {
                    // rows.push(<img className="pixel" src="r-virus.png" alt="" />)
                    rows.push(
                        <div className="pixel virus red red-border">
                            <div className="eyes">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="mouth"></div>
                        </div>
                    )
                }
                if (this.state.board[row][col] === 5) {
                    // rows.push(<img className="pixel" src="b-virus.png" alt="" />)
                    rows.push(
                        <div className="pixel virus blue blue-border">
                            <div className="eyes">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="mouth"></div>
                        </div>
                    )
                }
                if (this.state.board[row][col] === 6) {
                    // rows.push(<img className="pixel" src="y-virus.png" alt="" />)
                    rows.push(
                        <div className="pixel virus yellow yellow-border">
                            <div className="eyes">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="mouth"></div>
                        </div>
                    )
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
