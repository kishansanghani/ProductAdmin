import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AddUpdateProductComponent } from './components/add-update-product/add-update-product.component';
import { TrashComponent } from './components/trash/trash.component';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';


const routes: Routes = [
  {
    path: '', 
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'add',
        component: AddUpdateProductComponent
      },
      {
        path: 'update/:id',
        component: AddUpdateProductComponent
      },
      {
        path: 'trash',
        component: TrashComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
