const initalState = {
    players: {
        player1: '',
        player2: '',
    },
    startgame: false,
    numberofwins: {
        player1: 0,
        player2: 0
    },
    winner: ''
}

function ticToc(state = initalState, action) {
    switch (action.type) {
        case 'ADD_PLAYERS':

            return { ...state, players: { player1: action.payload.player1, player2: action.payload.player2 }, startgame: true };
        case 'ADD_WIN':

            let winner = state.numberofwins[action.payload.player] + 1 === 6 ? action.payload.player : '';

            return { ...state, numberofwins: { ...state.numberofwins, [action.payload.player]: state.numberofwins[action.payload.player] + 1 }, winner: winner };
        default:
            return state;
    }
}

export default ticToc;