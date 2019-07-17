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
            gameActive: false,
            activeTab: 1,
            errors: [],
            createGame: {
                playerName: '',
                gameName: '',
                difficulty: 'easy',
                virusLevel: 10,
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
        this.handleStartSubmit = this.handleStartSubmit.bind(this);
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        this.handleJoinSubmit = this.handleJoinSubmit.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
        this.handleClearSubmit = this.handleClearSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clearGames();
        this.props.fetchGames();
    }
    componentDidUpdate(prevProps) {
        if(prevProps.game !== this.props.game) {
            this.setState({game: this.props.game});
            this.setState({ errors: this.props.errors })
        }
        if(prevProps.games !== this.props.games) {this.setState({games: this.props.games});}
        if(prevProps.errors !== this.props.errors) {}
        if (this.state.gameActive === true && this.props.game.id !== "") {
            this.props.isGameActive(true);
        }
        if(prevProps.games !== this.props.games) {this.setState({games: this.props.games});}
        if(prevProps.errors !== this.props.errors) {}
    }

    activateTab(tabIndex) {
        this.setState({activeTab: tabIndex})
    }

    handleStartSubmit(e) {

        if (arguments.length) e.preventDefault();
        this.setState({gameActive: true})
        const randomGame = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15).toString();
        const randomPlayer = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15).toString();
   
        const gameName = this.state.createGame.gameName.length ? this.state.createGame.gameName : randomGame;
        const virusLevel = this.state.createGame.virusLevel;
        const difficulty = this.state.createGame.difficulty;
        const playerName = this.state.createGame.playerName.length ? this.state.createGame.playerName : randomPlayer;
 
        this.props.createGame(gameName,virusLevel,difficulty,playerName);
        setTimeout(this.clearInputs(), 1000);
    }

    handleCreateSubmit(e) {
        e.preventDefault();
        
        this.props.createGame(
                this.state.createGame.gameName, 
                this.state.createGame.virusLevel,
                this.state.createGame.difficulty,
                this.state.createGame.playerName)
        setTimeout(this.clearInputs(), 1000);
        this.props.fetchGames();
    }
    handleGetSubmit(e) {
        e.preventDefault();
        this.props.fetchGame(this.state.getGame.gameName);
        this.props.clearQueryString();
        this.clearInputs();
        window.scrollTo(0, 0);

    }
    handleJoinSubmit(e) {
        e.preventDefault();
        this.props.joinGame(this.state.game.name, this.state.joinGame.playerName)
        this.clearInputs();
    }
    handleDeleteSubmit(e) {
        e.preventDefault();
        this.clearInputs();
        this.props.deleteGame(this.state.game.name);
        this.props.clearGames();
        this.props.fetchGames();
        this.props.isGameActive(false);
    }
    handleClearSubmit(e) {
        e.preventDefault();
        this.props.clearGames();
        this.clearInputs();

    }

    clearInputs() {
        const createGame = { playerName: '', gameName: '', difficulty: 'easy', virusLevel: 10,}
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
        const colors = ["#4CAE50", '#3F52F4', '#e50301']
        const difficulty = ['easy','medium','hard'].map((difficulty, i) => {
            const isActive = this.state.createGame.difficulty === difficulty ? true: false;
            return (
            <li key={difficulty}>
                <label>
                    <input type="radio" name="createGamedifficulty" value={difficulty}
                    onChange={this.updateCreate('difficulty')}
                    checked={isActive} 
                    />
                    <span 
                        className={isActive ? "checked" : null}
                        style={isActive ? 
                            { color: colors[i] } : null}
                            >
                                &#8681;</span>
                </label>
                <span>{difficulty}</span>
            </li>

        )}
        )

        return(
            <form onSubmit={this.handleCreateSubmit} className="create-form" >
                <h4>game options</h4>
                {/* <label htmlFor="create-name">game name:</label> */}

                {/* <label htmlFor="create-id">id:</label> */}
                <input type="text" id="create-id"
                    value="id will be automatically generated"
                    disabled />

                <div>
                    <div className="slider-header">
                        <h5>choose virus level</h5>
                        <div 
                            style={
                                this.state.createGame.virusLevel > 16 ?
                                    {borderColor: '#c40303', background: '#E50301',color: 'white' } :
                                    this.state.createGame.virusLevel < 5 ?
                                    {borderColor: 'rgb(76, 174, 80)', background: 'rgb(76, 174, 80)', color: 'white' } :
                        null}
                        >{this.state.createGame.virusLevel}</div>
                    </div>
                    
                    <input type="range" min="1" max="20" 
                        value={this.state.createGame.virusLevel}
                        onChange={this.updateCreate('virusLevel')} 
                        className="slider" id="virusSlider" 
                        />       
                </div>
                <div>
                    <h5>choose difficulty</h5>
                    <ul className="create-difficulty">
                        {difficulty}
                    </ul>
                </div>

                <button onClick={this.handleStartSubmit}>start singleplayer game</button>

                <div className="divider">
                    <hr />
                    <span>OR</span>
                </div>

                <input type="text" id="create-name"
                    value={this.state.createGame.gameName}
                    onChange={this.updateCreate('gameName')}
                    placeholder="enter a name for your game" />

                <input type="text" id="create-player"
                    value={this.state.createGame.playerName}
                    onChange={this.updateCreate('playerName')} 
                    placeholder="enter your name"/>            
                            
                <button type="submit">create multiplayer game</button>
                
            </form>
        )
    }

    renderShow() {
        const players = this.state.game.players;

        return (
            <div className="show-join">

                <form onSubmit={this.handleJoinSubmit}>
                
                    <h4>current game:</h4>

                    <h5>game name</h5>
                    <input type="text" id="show-name"
                        value={this.state.game.name}
                        disabled />

                    <h5>virus level</h5>
                    <input type="text" value={this.state.game.virusLevel} disabled/>

                    <h5>difficulty level</h5>
                    <input type="text" value={this.state.game.difficulty} disabled/>


                    <h5>players</h5>
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
                            onChange={this.updateJoin('playerName')}
                            />
                            {this.state.gameActive ? null :<input type="submit" 
                                value="join game" />}
                        </div>
                    }

                {/* <button onClick={this.handleClearSubmit}>clear game</button> */}
                <div className="buttons">
                    {/* <button className="delete" onClick={() => this.setState({ gameActive: true })}>delete</button> */}
                    <button className="delete"onClick={this.handleDeleteSubmit}>delete</button>
                    {this.state.gameActive ? null : <button onClick={this.handleStartSubmit}>start game</button>}
                </div>
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
        
        const activeTab = this.state.activeTab;
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
{/* 
                <ul className="tabs">
                    <li onClick={this.activateTab}>
                        create game
                    </li>
                    <li>search or join a game</li>
                    <li>controls</li>
                </ul> */}
                {this.state.game.name ? this.renderShow() : this.renderCreate()}
                {this.renderFindGame()}
               

                <GameIndexContainer />

                
               
            </>
        );
    }
}

export default GameForm;