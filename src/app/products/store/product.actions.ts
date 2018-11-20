import { Action } from "@ngrx/store";
import { Product } from "../product";

export enum ProductActionTypes {
    ToggleProductCode = '[Product] Toggle Product Code',
    SetCurrentProduct = '[Product] Set Current Product',
    ClearCurrentProduct = '[Product] Clear Current Product'
}

// Action creators
export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode

   constructor(public payload: boolean) { }
}

export class SetCurrentProduct implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;

    constructor(public payload: Product) { }
}

export class ClearCurrentProduct implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;
}

export type ProductActions = ToggleProductCode | SetCurrentProduct | ClearCurrentProduct;