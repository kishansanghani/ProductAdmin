import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  getAllProducts(key) {
    return this.getLocalStorage(key);
  }

  getActiveProducts(key) {
    return this.getLocalStorage(key).filter(d => {
      return d.isDeleted === 2
    });
  }

  getSoftDeletedProducts(key) {
    return this.getLocalStorage(key).filter(d => {
      return d.isDeleted === 1;
    });
  }

  getProductById(id) {
    const product = this.getLocalStorage('products');
    return product.filter(d => {
      return d.id === id
    }).map(obj => {
      return obj;
    });

  }

  getLocations() {
    return [{title: 'Rajkot', selected: false}, {title: 'Ahmedabad', selected: false}, {title: 'Surat', selected: false}];
  }
}
