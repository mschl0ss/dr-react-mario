export const RECEIVE_QUERY_STRING = 'RECEIVE_QUERY_STRING'
export const CLEAR_QUERY_STRING = 'CLEAR_QUERY_STRING'
export const RECEIVE_FILTERED_GAMES = 'RECEIVE_FILTERED_GAMES';

export const receiveFilteredGames = games => ({
    type: RECEIVE_FILTERED_GAMES,
    games
})

export const receiveQueryString = query => ({
    type: RECEIVE_QUERY_STRING,
    query
})

export const clearQueryString= () => ({
    type: CLEAR_QUERY_STRING,
    
})