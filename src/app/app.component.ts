import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navbarOpened = true;
  
  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
  }
}
