import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  allProducts: any = [];
  products: any = [];
  location: any = [];

  constructor(
    private productService: ProductsService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit() {
    this.getInItData();
  }

  getInItData() {
    this.products = this.productService.getSoftDeletedProducts('products');
    this.location = this.productService.getLocations();
    this.allProducts = this.productService.getAllProducts('products');
  }

  restore(id) {
    if (id) {
      this.allProducts.map(d => {
        if (d.id === id) {
          d.isDeleted = 2;
        };
        return d;
      });

      this.productService.setLocalStorage('products', this.allProducts);
      this.getInItData();
    }
  }

  delete(id) {
    this.confirmationDialogService.confirm('Are you sure you want to delete?', 'Do you really want to delete product?')
    .then((confirmed) => {
      if (id && confirmed) {
          this.allProducts.map(d => {
            if (d.id === id) {
              d.isDeleted = 0;
            };
            return d;
          });
    
          this.productService.setLocalStorage('products', this.allProducts);
          this.getInItData();
        }
    }).catch(
      () => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
    );

  }

}
