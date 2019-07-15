import axios from 'axios';

export const getGame = name => (
    axios.get('/api/games', {
        params: {
            name
        }
    })
)

export const getGames = () => (
    axios.get('/api/games/all')
)

export const createGame = (name,virusLevel,difficulty,player) => (
    axios.post('/api/games', {
        name,
        player,
        virusLevel,
        difficulty,
    })
)

export const joinGame = (name, player) => (
    axios.patch('/api/games', {
        name,
        player
    })
)