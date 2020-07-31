import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './modules/products/components/confirmation-dialog/confirmation-dialog.component';
import { ViewProductComponent } from './modules/products/components/view-product/view-product.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    AppComponent,
    ViewProductComponent,
    ConfirmationDialogComponent,
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxImageZoomModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
