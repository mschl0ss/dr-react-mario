import axios from 'axios';

export const getGame = name => (
    axios.get('/api/games', {
        params: {
            name
        }
    })
)

export const createGame = (name, player) => (
    axios.post('/api/games', {
        name,
        player
    })
)

export const joinGame = (name, player) => (
    axios.patch('/api/games', {
        name,
        player
    })
)