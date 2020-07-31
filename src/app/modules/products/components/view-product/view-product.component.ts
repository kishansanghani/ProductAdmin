import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  id: string = '';
  model = {
    id: '',
    productImage: '',
    productTitle: '',
    productDescription: '',
    stockStatus: '',
    productPrice: null,
    productRating: 0,
    location: [{title: 'Rajkot', selected: true}, {title: 'Ahmedabad', selected: false}, {title: 'Surat', selected: false}],
    isDeleted: null // Not deleted
  }
  constructor(
    private productService: ProductsService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { 
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

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= Number(number); i++){
       items.push(i);
    }
    return items;
  }

  back() {
    this.location.back();
  }

}
