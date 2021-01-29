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
            product.warranty_years !== undefined &&
            product.name !== null &&
            product.price !== null &&
            product.rating !== null &&
            product.available !== null &&
            product.warranty_years !== null &&
            !isNaN(Number(product.price)) &&
            !isNaN(Number(product.rating)) &&
            !isNaN(Number(product.warranty_years))
        ) {
            console.log('0', product.rating);
            return true;
        }
        return false;
    }
}
