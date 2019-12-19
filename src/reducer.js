export default function(state, action) {
    switch (action.type) {
        case 'botsmove':
            const bots = state.bots.map(item => {
                item.top = item.top + action.payload;
                if (item.top > action.arenaHeight) {
                    return action.randomPosition(item, 1);
                }
                return item;
            });
            return {...state, bots};
        default:
            return state;
    }
}