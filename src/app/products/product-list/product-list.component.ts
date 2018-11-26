import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { Product } from '../product';

/* ngRx */
import { Store, select } from '@ngrx/store';
import  * as fromProducts from '../store/products.reducer';
import * as productActions from '../store/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;

  displayCode: boolean;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  componentActive = true;
  constructor(private store: Store<fromProducts.State>) { }

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.products$ = this.store.pipe(select(fromProducts.getProducts)) as Observable<Product[]>;

    // dispatch action so ngRx effects module loads products, that eventually
    // makes its way to subscriber above
    this.store.dispatch(new productActions.Load());

    this.errorMessage$ = this.store.pipe(select(fromProducts.getError));

    // TODO: unsubscribe
    // subscribing to any state changes in the 'products' slice
    this.store.pipe(
      select(fromProducts.getShowProductCode),
      takeWhile(() => this.componentActive)
    ).subscribe(
      showProductCode => this.displayCode = showProductCode
    );

    this.store.pipe(
      select(fromProducts.getCurrentProduct),
      takeWhile(() => this.componentActive)
    ).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    //this.displayCode = value;
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
