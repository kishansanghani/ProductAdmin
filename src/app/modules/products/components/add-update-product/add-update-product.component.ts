import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss']
})
export class AddUpdateProductComponent implements OnInit {

  id: string = '';
  model = {
    id: this.generateId(),
    productImage: '',
    productTitle: '',
    productDescription: '',
    stockStatus: 'inStock',
    productPrice: null,
    productRating: 0,
    location: [{title: 'Rajkot', selected: true}, {title: 'Ahmedabad', selected: false}, {title: 'Surat', selected: false}],
    isDeleted: 2 // Not deleted
  }

  products: any = [];
  constructor(
    private productService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.products = this.productService.getLocalStorage('products');

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
    });
  }

  ngOnInit() {
    if (this.id) {
      const product = this.productService.getProductById(this.id);
      if (product.length > 0) {
        Object.assign(this.model, product[0]);
      } else {
        console.log('No Product found!')
      }
    }
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  onSubmit(form) {
    if(form.invalid) {
      return;
    }

    if (this.id) {
      this.products.map(d => {
        if (d.id === this.id) {
          d.productImage = this.model.productImage;
          d.productTitle = this.model.productTitle;
          d.productDescription = this.model.productDescription;
          d.stockStatus = this.model.stockStatus;
          d.productPrice = this.model.productPrice;
          d.productRating = this.model.productRating;
          d.location = this.model.location;
        };
        return d;
      });

      this.productService.setLocalStorage('products', this.products);
    } else {
      this.products = this.products.concat([this.model]);
      this.productService.setLocalStorage('products', this.products);
    }
    this.router.navigateByUrl('products');
  }

}
