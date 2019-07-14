import React from 'react';
import Cell from './cell'; 
import 

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pillFalling: false,
            curPill1X: 3,
            curPill1Y: 0,
            curPull1C: 1,
            curPill2X: 4,
            curPill2Y: 0,
            curPill2C: 2,
            board: 0,
            pills: []
        }
    }

    componentDidMount() {
        setInterval(() => this.computeGame(), 200);
    }

    computeGame() {
        let board = [];
        for(let i =0; i < 16; i++){
            let row = [];
            for(let j = 0; j< 8; j++) {
                row.push(0)
            }
            board.push (row)
        }

        if (this.state.pillFalling === false) {
            board[this.state.curPill1Y][this.state.curPill1X] = 1;
            board[this.state.curPill2Y][this.state.curPill2X] = 2;
            board[4][0] = 0;
            this.setState ({
             curpill1X: 3,
             curPill1Y: 0,
             curPill2X: 4,
             curPill2Y: 0,
             pillFalling: true
            });
 
         } else {

             this.setState ({
                 curpill1X: 3,
                 curPill1Y: this.state.curPill1Y+1,
                 curPill2X: 4,
                 curPill2Y: this.state.curPill1Y+1
                }); 
            
                board[this.state.curPill1Y][this.state.curPill1X] = 1;
                board[this.state.curPill2Y][this.state.curPill2X] = 2;
                this.checkCollisionWithPills(this.state);
 
         }

         if(this.state.curPill1Y ===15 || this.state.curPill2Y ===15 ){
             let pills = this.state.pills;
             pills.push([this.state.curPill1X, this.state.curPill1Y,this.state.curPull1C])
             pills.push([this.state.curPill2X, this.state.curPill2Y, this.state.curPill2C])
             this.setState({
                 pillFalling: false,
                 curPill1Y: 0,
                 curPill2Y: 0, 
                 pills: pills
             })
         }



         for(let i = 0; i < this.state.pills.length; i++) {
            let pill = this.state.pills[i];
            board[pill[1]][pill[0]] = pill[2];
         }



         

         this.setState( {
             board:board
         })
 
    }

    checkCollisionWithPills(state) {
        let pills = this.state.pills;
        let pillFalling = true; 
        for(let i = 0 ;i < state.pills.length ; i++){
            let pill = state.pills[i];
            if((state.curPill1X === pill[0] && state.curPill1Y+1 === pill[1]) ||
            (state.curPill2X === pill[0] && state.curPill2Y+1 === pill[1]) ||
            state.curPill1Y ===15 ||
            state.curPill2Y ===15) {
                pills.push([this.state.curPill1X, this.state.curPill1Y,this.state.curPull1C])
                pills.push([this.state.curPill2X, this.state.curPill2Y, this.state.curPill2C])
                pillFalling = false;
                this.setState({
                    pills: pills,
                    pillFalling: pillFalling
                })  
                return;
             
            }
        }
        
    }
    render() {
        if(this.state.board === 0) {
            return <div></div>
        }

       
        let boardRender = [];
        for(let i =0; i < 16; i++){
            let row = [];
            for(let j = 0; j< 8; j++) {
                if(this.state.board[i][j] === 0) {
                    row.push(<div className="cell"></div>)
                }
                if(this.state.board[i][j] === 1) {
                    row.push(<div className="cell cell-pill-red"></div>)
                }
                if(this.state.board[i][j] === 2) {
                    row.push(<div className="cell cell-pill-blue"></div>)
                }
            }
            boardRender.push(<div className="board-row">{row}</div>
                )
        }
        
       

        return(
            boardRender
            
        )
    }
}

export default Game;