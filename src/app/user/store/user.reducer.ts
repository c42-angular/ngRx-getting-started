import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserActions, UserActionTypes } from "./user.actions";

export interface UserState {
    usernameMaskOn: boolean
}

const initialState: UserState = {
    usernameMaskOn: false
};

// Selector functions
const geUserFeatureState = createFeatureSelector<UserState>('user');

export const getuserNameMaskOn = createSelector(geUserFeatureState, userState => userState.usernameMaskOn);


export function userReducer(state = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.UserNameMaskOn:
            return {
                ...state,
                usernameMaskOn: true
            };

        case UserActionTypes.UserNameMaskOff:
            return {
                ...state,
                usernameMaskOn: false
            };

        default:
            return state;
    }
}