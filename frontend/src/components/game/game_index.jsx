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
            }]
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
    }

    


    render() {
    
        const pListStyle = { listStyle: 'none', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '300px'}
        const gListStyle = { listStyle: 'none', marginBottom: '30px',paddingBottom: '20px', borderBottom: 'solid 3px black'}
        const games = this.state.games.map((game,i) => (

            <ul key={i} style={gListStyle}>
                <li key={game._id}>id: {game._id}</li>
                <li key={game.name}>name: {game.name}</li>
                <li>Players:
                    {game.players ? game.players.map((player,i)=> (
                        
                        <ul key={i} style={pListStyle}>
                            <li>id: {player._id}</li>
                            <li>name: {player.name}</li>
                        </ul>
                        
                    )):null}
                </li>
                <li key={game._id + game.name}>
                    sample seed values:&nbsp;
                    {game.seedValues ? game.seedValues.map((value, i) => {
                        let string = value.toString();
                        if (i !== this.length - 1) string += ", ";
                        return string;
                    }): null}
                </li>
            </ul>
        ))
        return (
            <div>
                {games}
            </div>
        )
    }
}

export default GameIndex;