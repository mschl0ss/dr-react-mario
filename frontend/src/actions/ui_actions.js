

export const ACTIVE_GAME = 'ACTIVE_GAME';

export const isGameActive = bool => ({
    type: ACTIVE_GAME,
    bool
})