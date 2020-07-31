import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewProductComponent } from './modules/products/components/view-product/view-product.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/products',
  },
  {
    path: 'products',
    loadChildren: () =>
        import('./modules/products/products.module').then(
            m => m.ProductsModule
        ),
  },
  {
    path: 'view/:id',
    component: ViewProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
