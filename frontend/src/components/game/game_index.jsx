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
    
        const pListStyle = { listStyle: 'none', borderTop: 'solid 1px black', borderBottom: 'solid 1px black',
            margin: '20px 0',padding: '20px 0 20px 20px', width: '300px'}
        const gListStyle = { listStyle: 'none', marginBottom: '30px',paddingBottom: '20px', borderBottom: 'solid 3px black'}
        const games = this.state.games.map((game,i) => (

            <ul key={i} style={gListStyle}>
                <li key={game.name}><h2>name: {game.name}</h2></li>
                <li key={game._id}><h4>id: {game._id}</h4></li>
                <li>Players:
                    {game.players ? game.players.map((player,i)=> (
                        
                        <ul key={i} style={pListStyle}>
                            <li>name: {player.name}</li>
                            <li>id: {player._id}</li>
                        </ul>
                        
                    )):null}
                </li>
                <li key={game._id + game.name}>
                    sample seed values:&nbsp;
                    {game.seedValues ? game.seedValues.map((value, i) => {
                        let string = value.toString();
                        if (i !== game.seedValues.length - 1) string += ", ";
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