

export const ACTIVE_GAME = 'ACTIVE_GAME';

export const RECEIVE_SCORE = "RECEIVE_SCORE";
export const GAME_RUNNING = "GAME_RUNNING";


export const gameRunning = running => ({
    type: GAME_RUNNING,
    running
})

export const receiveScore = score => ({
    type: RECEIVE_SCORE,
    score
})
export const isGameActive = bool => ({
    type: ACTIVE_GAME,
    bool
})