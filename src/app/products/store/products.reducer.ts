import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { ProductActions, ProductActionTypes } from './product.actions';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    products: ProductState
}

export interface ProductState {
    showProductCode: boolean
}

const initialState: ProductState = {
    showProductCode: true
};

// Selector functions
const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(getProductFeatureState, productState => productState.showProductCode);

// all registered reducers are called by Store when an action is dispatched to it
// each reducer looks at the action's type and handles the ones it is interested in
// it 
export function productsReducer(state = initialState, action: ProductActions): ProductState {
    console.log(state);
    console.log(action);

    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload
            };
    
        default:
            return state;
    }
}