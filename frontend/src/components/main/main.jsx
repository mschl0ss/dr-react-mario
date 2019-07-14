import React from 'react';

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game: {
                players: [],
            },
            createGame: {
                playerName: '',
                gameName: '',
                gameId: '',
            },
            getGame: {
                name: '',
                id: '',
                players: [],
            },
            joinGame: {
                playerName: '',
            },
            
            

            
            player1: {},
            player2: {},
        }
        
        this.handleGetSubmit = this.handleGetSubmit.bind(this);
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        this.handleJoinSubmit = this.handleJoinSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.game !== this.props.game) {
            this.setState({game: this.props.game});
        }
        
    }

    handleCreateSubmit(e) {
        e.preventDefault();
        this.props.createGame(this.state.createGame.gameName, this.state.createGame.playerName)
    }


    handleGetSubmit(e) {
        e.preventDefault();
        this.props.fetchGame(this.state.getGame.name)
    }

    handleJoinSubmit(e) {
        e.preventDefault();
        this.props.joinGame(this.state.game.name, this.state.joinGame.playerName)
    }

    updateCreate(field) {
        return (e) => {
            let createGame = Object.assign({}, this.state.createGame)
            createGame[field] = e.target.value
            this.setState({ createGame: createGame})
            // console.log(this.state)
        }
    }

    updateGet(field) {
        return (e) => {
            let getGame = Object.assign({}, this.state.getGame)
            getGame[field] = e.target.value
            this.setState({ getGame: getGame })
        }
    }

    updateJoin(field) {
        return (e) => {
            let joinGame = Object.assign({}, this.state.joinGame)
            joinGame[field] = e.target.value
            this.setState({ joinGame: joinGame })
        }
    }

    render() {
        // console.log(this.state.game.id)
        console.log(this.state.game.players)

        const players = this.state.game.players.map(player => (
            <ul>
                <li>Player Name: {player.name}</li>
                <li>Player ID: {player._id}</li>
            </ul>
        ))
        return (
            <div>
                <h1>Game</h1>
                <p>Game Name: {this.state.game.name}</p>
                <p>Game ID:{this.state.game.id}</p>
                <p>Players:{players}</p>

                <h3>Create a Game</h3>
                <form onSubmit={this.handleCreateSubmit}>
                    <label>Enter Game name
                        <input type="text" value={this.state.createGame.gameName} onChange={this.updateCreate('gameName')} />
                    </label>
                
                    <label>Your name
                        <input type="text" value={this.state.createGame.name} onChange={this.updateCreate('playerName')} />
                    </label>
                    <input type="submit" value="create game" />

                </form>
                

                <h3>FetchGame</h3>
                <form onSubmit={this.handleGetSubmit}>

                    <label>Game Name
                        <input type="text" value={this.state.name} onChange={this.updateGet('name')} />
                    </label>
                    
                    <input type="submit" value="get game"/>
                </form>

                <h3>Join</h3>
                <form onSubmit={this.handleJoinSubmit}>

                    <label>Player Name
                        <input type="text" value={this.state.name} onChange={this.updateJoin('playerName')} />
                    </label>

                    <input type="submit" value="join game"/>
                </form>

                

                
               
            </div>
        );
    }
}

export default MainPage;