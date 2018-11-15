// all registered reducers are called by Store when an action is dispatched to it
// each reducer looks at the action's type and handles the ones it is interested in
// it 
export function productsReducer(state, action) {
    console.log(state);
    console.log(action);

    switch (action.type) {
        case 'DISPLAY_PRODUCT_CODE_TOGGLE':
            return {
                ...state,
                showProductCode: action.payload
            };
    
        default:
            return state;
    }
}