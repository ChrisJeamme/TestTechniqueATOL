import { Injectable } from '@angular/core';
import { TProduct } from '../@types/product.type';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    public getProductToModify() {
        return localStorage.getItem('productToModify');
    }

    public setProductToModify(product: TProduct) {
        return localStorage.setItem('productToModify', JSON.stringify(product));
    }
}
