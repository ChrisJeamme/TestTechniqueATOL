import { Injectable } from '@angular/core';
import { TProduct } from '../@types/product.type';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor(private storage: Storage) {}

    public getProductToModify(success: Function, error: Function) {
        return this.storage.get('productToModify').then(
            (productToModify: string) => success(productToModify),
            (errorCase: any) => error(errorCase)
        );
    }

    public setProductToModify(product: TProduct) {
        return this.storage.set('productToModify', JSON.stringify(product));
    }
}
