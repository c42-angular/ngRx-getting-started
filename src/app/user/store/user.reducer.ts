export function userReducer(state, action) {
    switch (action.type) {
        case 'USER_NAME_MASK_ON':
            return {
                ...state,
                usernameMaskOn: true
            };

        case 'USER_NAME_MASK_OFF':
            return {
                ...state,
                usernameMaskOn: false
            };

        default:
            return state;
    }
}