import { Injectable } from '@angular/core';
import { TProduct } from '../@types/product.type';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor() {}

    isProductValid(product: TProduct | undefined) {
        if (product === undefined) {
            return false;
        }
        if (
            product.name !== undefined &&
            (product.type === 'phone' || product.type === 'computer') &&
            product.price !== undefined &&
            product.rating !== undefined &&
            product.available !== undefined &&
            product.warranty_years !== undefined
        ) {
            return true;
        }
        return false;
    }
}
