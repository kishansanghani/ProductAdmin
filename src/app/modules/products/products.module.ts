import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { AddUpdateProductComponent } from './components/add-update-product/add-update-product.component';
import { ProductsService } from 'src/app/services/products.service';

import { UrlValidatorDirective } from '../../directives/url-validator.directive';
import { TrashComponent } from './components/trash/trash.component';
import { ConfirmationDialogService } from './components/confirmation-dialog/confirmation-dialog.service';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    ProductsComponent,
    AddUpdateProductComponent,
    UrlValidatorDirective,
    TrashComponent
  ],
  providers: [ProductsService, ConfirmationDialogService],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
  ],
})
export class ProductsModule { }
