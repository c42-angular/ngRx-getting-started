import { Action } from "@ngrx/store";

export enum UserActionTypes {
    UserNameMaskOn = '[User] User Name Mask On',
    UserNameMaskOff ='[User] User Name Mask Off'
}

export class UserNameMaskOnActionOn implements Action {
    readonly type = UserActionTypes.UserNameMaskOn;
}

export class UserNameMaskOnActionOff implements Action {
    readonly type = UserActionTypes.UserNameMaskOff;
}

export type UserActions = UserNameMaskOnActionOn | UserNameMaskOnActionOff;