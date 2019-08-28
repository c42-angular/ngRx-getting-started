import { State } from "src/app/state/app.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface UserState {
    maskUserName: boolean
}

const initialState: UserState = {
    maskUserName: false
};

// selectors
const getUserFeatureState = createFeatureSelector<UserState>('user');
export const getMaskUserName = createSelector(getUserFeatureState, userState => userState.maskUserName);

export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'MASK_USER_NAME':
            return {
                ...state,
                maskUserName: action.payload
            };
    
        default:
            return state;
    }
}