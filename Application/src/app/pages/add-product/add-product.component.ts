import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TProduct } from 'src/app/@types/product.type';
import { ProductService } from 'src/app/services/product.service';
import { ServerCommunicationService } from 'src/app/services/server-communication.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
    newProduct: TProduct;

    constructor(
        private serverCommunicationService: ServerCommunicationService,
        private router: Router,
        private productService: ProductService
    ) {
        this.newProduct = {
            name: 'AC1 Phone1',
            type: 'phone',
            price: 155.5,
            rating: 2.3,
            warrantyYears: 2,
            available: true
        };
    }

    addProduct(product: string) {
        const newProduct = JSON.parse(product);
        if (this.productService.isProductValid(newProduct)) {
            this.serverCommunicationService
                .addProduct(newProduct as TProduct)
                .subscribe(
                    (result) => {
                        console.log(result);
                        this.router.navigateByUrl('/');
                    },
                    (err) => {
                        console.log('Error : ', err);
                    }
                );
        } else {
            console.log(
                'Impossible d\'envoyer le produit car il n\'est pas valide'
            );
        }
    }
}
