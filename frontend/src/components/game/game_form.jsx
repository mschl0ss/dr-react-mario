import React from 'react';

class GameForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game: {
                players: [],
                seedValues: []
            },
            errors: [],
            createGame: {
                playerName: '',
                gameName: '',
            },
            getGame: {
                gameName: '',
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
        this.clearGames = this.clearGames.bind(this);
    }

    componentDidMount() {
        this.props.clearGames();
    }
    componentDidUpdate(prevProps) {
        if(prevProps.game !== this.props.game) {
            this.setState({game: this.props.game});
            this.setState({errors: this.props.errors})
        }
        
    }

    handleCreateSubmit(e) {
        e.preventDefault();
        this.props.createGame(this.state.createGame.gameName, this.state.createGame.playerName)
        this.clearInputs();
    }


    handleGetSubmit(e) {
        e.preventDefault();
        this.props.fetchGame(this.state.getGame.gameName);
        this.clearInputs();
    }

    handleJoinSubmit(e) {
        e.preventDefault();
        this.props.joinGame(this.state.game.name, this.state.joinGame.playerName)
        this.clearInputs();
    }

    clearGames() {
        this.props.clearGames();
        this.clearInputs();
    }

    clearInputs() {
        const createGame = {playerName: '',gameName: ''}
        const getGame = {gameName: ''}
        const joinGame = {playerName: ''}
        this.setState({createGame: createGame})
        this.setState({getGame: getGame})
        this.setState({joinGame: joinGame})
        this.props.clearGamesErrors();
        

    }

    updateCreate(field) {
        return (e) => {
            let createGame = Object.assign({}, this.state.createGame)
            createGame[field] = e.target.value
            this.setState({ createGame: createGame})
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

        const pListStyle = {
            listStyle: 'none', borderTop: 'solid 1px black', borderBottom: 'solid 1px black',
            margin: '20px 0', padding: '20px 0 20px 20px', width: '300px'
        }
        const gListStyle = { listStyle: 'none', marginBottom: '30px', paddingBottom: '20px', borderBottom: 'solid 3px black' }

        const players = this.state.game.players.map((player,i) => (
            <ul key={i} style={pListStyle}>
                <li key={player.name}>Player Name: {player.name}</li>
                <li key={player.id}>Player ID: {player._id}</li>
            </ul>
        ));

        const seedValues = this.state.game.seedValues.map((value,i) => {
            let string = value.toString();
            if (i !== this.state.game.seedValues.length-1) string += ", ";
            return string;
        })

        const errors = this.props.errors.map((error,i) => (
            <li key={i}>{error}</li>
        ))
        const errorStyle = {color: 'red', height: '20px'}
        return (
            <div>
                <ul style={gListStyle}>
                    <li><h3>Game Name: {this.state.game.name}</h3></li>
                    <li><h4>Game ID:{this.state.game.id}</h4></li>
                    <li>Players:{players}</li>
                    <li><p>Sample Seed Values: {seedValues}</p></li>
                </ul>

                <button onClick={this.clearGames}>Clear Game</button>
                
                <ul style={errorStyle}>
                    {errors}
                </ul>

                <h3>Create a Game</h3>
                <form onSubmit={this.handleCreateSubmit}>
                    <label>Enter Game name
                        <input type="text" value={this.state.createGame.gameName} onChange={this.updateCreate('gameName')} />
                    </label>
                
                    <label>Your name
                        <input type="text" value={this.state.createGame.playerName} onChange={this.updateCreate('playerName')} />
                    </label>
                    <input type="submit" value="create game" />

                </form>
                

                <h3>FetchGame</h3>
                <form onSubmit={this.handleGetSubmit}>

                    <label>Game Name
                        <input type="text" value={this.state.getGame.gameName} onChange={this.updateGet('gameName')} />
                    </label>
                    
                    <input type="submit" value="get game"/>
                </form>

                <h3>Join</h3>
                <form onSubmit={this.handleJoinSubmit}>

                    <label>Player Name
                        <input type="text" value={this.state.joinGame.playerName} onChange={this.updateJoin('playerName')} />
                    </label>

                    <input type="submit" value="join game"/>
                </form>

                

                
               
            </div>
        );
    }
}

export default GameForm;