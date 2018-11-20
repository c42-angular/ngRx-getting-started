import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

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
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private productService: ProductService, private store: Store<fromProducts.ProductState>) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    // TODO: unsubscribe
    // subscribing to any state changes in the 'products' slice
    this.store.pipe(select(fromProducts.getShowProductCode)).subscribe(
      showProductCode => this.displayCode = showProductCode
    );

    this.store.pipe(select(fromProducts.getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    //this.displayCode = value;
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.SetCurrentProduct(this.productService.newProduct()));
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
