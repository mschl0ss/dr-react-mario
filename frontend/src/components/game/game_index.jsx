import React from 'react';



class GameIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [{
                id: "",
                name: "",
                players: [],
                seedValues: [],
            }],
            filteredGames: [{
                id: "",
                name: "",
                players: [],
                seedValues: [],
            }],
            queryString: '',

        }
    }
    componentDidMount(){
        this.props.clearGames();
        this.props.fetchGames();
    }

    componentDidUpdate(prevProps){
        if(prevProps.games !== this.props.games) {
            this.setState({games:this.props.games})
        }
        if(prevProps.filteredGames !== this.props.filteredGames) {
            this.setState({filteredGames:this.props.filteredGames})
            this.setState({queryString:this.props.queryString})
        }
    }

    render() {

            const whichGames = this.state.queryString.length ? 
                this.state.filteredGames : this.state.games;

            const games = whichGames.map((game,i) => (
            <ul key={i} >
                <li key={game.name}><h2>name: {game.name}</h2></li>
                {/* <li key={game._id}><h4>id: {game._id}</h4></li> */}
                <li className="last">
                    {game.players ? game.players.map((player,i)=> (
                        
                        <ul key={i} >
                            <li>name: {player.name}</li>
                            {/* <li>id: {player._id}</li> */}
                        </ul>
                        
                    )):null}
                </li>
                <button onClick={() => this.props.fetchGame(game.name)}>select this game</button>
            </ul>
            
        
        ))
        const searchHeader = this.state.queryString.length ? <>{`search ${this.state.queryString} => ${this.state.filteredGames.length} results`} </>: null 
        return (
            <div className="games-index">
                <h4 className="search-header" >{searchHeader}</h4>
                {games}
            </div>
        )
    }
}

export default GameIndex;