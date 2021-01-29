import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TProduct } from '../@types/product.type';

@Injectable({
  providedIn: 'root',
})
export class ServerCommunicationService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(environment.serverUrl + '/products');
  }

  getProduct(id: string) {
    return this.http.get(environment.serverUrl + '/products/' + id);
  }

  addProduct(product: TProduct) {
    return this.http.post(environment.serverUrl + '/products', product);
  }

  replaceProduct(product: TProduct) {
    return this.http.put(
      environment.serverUrl + '/products/' + product.id,
      product
    );
  }

  deleteProduct(product: TProduct) {
    return this.http.delete(environment.serverUrl + '/products/' + product.id);
  }
}
