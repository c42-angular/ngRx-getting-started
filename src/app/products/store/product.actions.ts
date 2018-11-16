import { Action } from "@ngrx/store";

export enum ProductActionTypes {
    ToggleProductCode = '[Product] Toggle Product Code'
}

// Action creators
export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode

   constructor(public payload: boolean) { }
}

export type ProductActions = ToggleProductCode;