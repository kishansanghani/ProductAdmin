import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  clonedProducts: any = [];
  products: any = [];
  location: any = [];

  filter = {
    stockStatus: '',
    searchText: ''
  }
  constructor(
    private productService: ProductsService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit() {
    this.getInItData();
  }

  getInItData() {
    this.products = this.productService.getActiveProducts('products');
    this.location = this.productService.getLocations();
    this.clonedProducts = this.productService.getActiveProducts('products');
  }

  updateProduct(product) {
    this.router.navigateByUrl(`/products/update/${product.id}`)
  }

  filterChanged($event) {
    if ($event) {
      this.products =  this.clonedProducts.filter(d => {
        return d.stockStatus === $event
      });
    }
  }

  locationFilter($event) {
      // get selected location Title
      const a = this.location
        .filter(opt => opt.selected)
        .map(opt => opt.title);

      if (a.length > 0) {  
        // location selected
        this.products = this.clonedProducts
        .filter(product => {
          return product.location
            .filter(opt => opt.selected)
            .map(p => p.title)
            .find(title => {
              return a.find(checked => checked === title);});
          });
      } else {
        // No location selected
        this.products = this.clonedProducts
      }
  }

  searchProduct() {
    this.products = this.clonedProducts.filter(d => {
      return (d.productTitle.toLowerCase().includes(this.filter.searchText.toLowerCase()) 
      || d.productDescription.toLowerCase().includes(this.filter.searchText.toLowerCase())) 
    });
  }

  remove(id) {
    this.confirmationDialogService.confirm('Are you sure you want to remove?', 'Do you really want to remove product?')
    .then((confirmed) => {
      if (id && confirmed) {
          this.products.map(d => {
            if (d.id === id) {
              d.isDeleted = 1;
            };
            return d;
          });
    
          this.productService.setLocalStorage('products', this.products);
          this.getInItData();
        }
    }).catch(
      () => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
    );
  }

}
