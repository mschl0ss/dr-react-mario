import React from 'react';
import GameIndexContainer from './game_index_container';

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
            filteredGames: [{
                id: "",
                name: "",
                players: [],
                seedValues: [],
            }],
            games: [{
                id: "",
                name: "",
                players: [],
                seedValues: [],
            }],
        }
        
        this.handleGetSubmit = this.handleGetSubmit.bind(this);
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        this.handleJoinSubmit = this.handleJoinSubmit.bind(this);
        this.handleShowSubmit = this.handleShowSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clearGames();
        this.props.fetchGames();
    }
    componentDidUpdate(prevProps) {
        if(prevProps.game !== this.props.game) {
            this.setState({game: this.props.game});
            window.scrollTo(0, 0);
        }
        if(prevProps.games !== this.props.games) {
            this.setState({games: this.props.games});
        }
        if(prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors })
            window.scrollTo(0, 0);
        }
    }

    handleCreateSubmit(e) {
        e.preventDefault();
        this.props.createGame(this.state.createGame.gameName, this.state.createGame.playerName)
        this.clearInputs();
    }
    handleGetSubmit(e) {
        // console.log('handlGetSubmit')
        e.preventDefault();
        this.props.fetchGame(this.state.getGame.gameName);
        this.props.clearQueryString();
        this.clearInputs();
    }
    handleJoinSubmit(e) {
        e.preventDefault();
        this.props.joinGame(this.state.game.name, this.state.joinGame.playerName)
        this.clearInputs();
    }
    handleShowSubmit(e) {
        // console.log('handlShowSubmit')
        e.preventDefault();
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
        this.props.clearQueryString();
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
        let games = this.state.games;
        
        let filtered = games.filter(game => {
            return game.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        // debugger;
        this.props.receiveFilteredGames(filtered);
        this.props.receiveQueryString(e.target.value);
        this.setState({filteredGames: filtered})

        
        
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

    renderCreate() {

        // <div className="pill-button">
        //     <button type="submit">create game</button>
        //     <div className="left-pill"></div>
        //     <div className="right-pill"></div>
        // </div>

        return(
            <form onSubmit={this.handleCreateSubmit} className="create-form" >
                <h4>create a new game</h4>
                {/* <label htmlFor="create-name">game name:</label> */}
                <input type="text" id="create-name"
                    value={this.state.createGame.gameName}
                    onChange={this.updateCreate('gameName')} 
                    placeholder="enter a name for your game"/>

                {/* <label htmlFor="create-id">id:</label> */}
                <input type="text" id="create-id"
                    value="id will be automatically generated"
                    disabled />

                {/* <label htmlFor="create-player">your name:</label> */}
                <input type="text" id="create-player"
                    value={this.state.createGame.playerName}
                    onChange={this.updateCreate('playerName')} 
                    placeholder="enter your name"/>            
                            
                <button type="submit">create game</button>
                
            </form>
        )
    }

    renderShow() {
        const players = this.state.game.players;
        
                
        return (
            <div className="show-join">

                <form onSubmit={this.handleJoinSubmit}>
                
                    <h4>current game:</h4>
                    {/* <label htmlFor="show-name">game name:</label> */}
                    <input type="text" id="show-name"
                        value={this.state.game.name}
                        onChange={this.updateCreate('gameName')}
                        disabled />

                    {/* <label htmlFor="show-id">id:</label> */}
                    <input type="text" id="show-id"
                        value={this.state.game.id}
                        disabled />

                    
                    <input type="text" id="show-player-0"
                        value={this.state.game.players[0].name}
                        disabled />
                    
 
                    {players.length > 1 ? 
                        <input type="text" id="show-player-0"
                        value={this.state.game.players[1].name}
                        disabled />
                        :
                        <div className="text-button">
                        <input type="text" 
                            value={this.state.joinGame.playerName} 
                            onChange={this.updateJoin('playerName')} />
                        <input type="submit" 
                            value="join game" />
                        </div>
                }

                <button onClick={this.handleShowSubmit}>clear game</button>
               
                </form>
            </div>
        )
    }

    renderFindGame() {

        return (
                
                <form onSubmit={this.handleGetSubmit}>
                    <h4>find a game to join</h4>
                    <input type="text" id="find-game-name"
                            value={this.state.getGame.gameName} 
                            onChange={this.updateGet('gameName')} 
                            placeholder="enter game name"/>
                    

                    <button type="submit">find game</button>
                </form>
           
        )

    }
    render() {

        const errors = this.props.errors.length? this.props.errors[0].map((error,i) => {
            return(
            <li key={i}>{error}</li>
        )}) : null;
        
        
        return (
            <>
               
                <ul className={this.props.errors.length ? "errors" : "errors blank"} id="errors">
                    {errors}
                    {this.props.errors.length ? <button 
                        className="errors-cancel" 
                        onClick={this.props.clearGamesErrors}>
                            &#10006;
                        </button> : null}
                </ul>


                {this.state.game.name ? this.renderShow() : this.renderCreate()}
                {this.renderFindGame()}
               

                <GameIndexContainer />

                
               
            </>
        );
    }
}

export default GameForm;