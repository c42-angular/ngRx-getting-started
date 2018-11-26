import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.actions';

@Injectable()
export class ProductEffects {
    constructor(private productsService: ProductService, private actions$: Actions) { }

    @Effect()
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap(action => this.productsService.getProducts().pipe( // flattens all inner observables emitted for each source observable & emit them all as single observable
            map(products => new productActions.LoadSuccess(products)),
            catchError(err => of(new productActions.LoadFail(err)))
            )
        )
    );
}