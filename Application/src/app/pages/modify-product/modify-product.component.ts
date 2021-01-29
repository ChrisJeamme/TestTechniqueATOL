import { StorageService } from './../../services/storage.service';
import { ProductService } from './../../services/product.service';
import { Router } from '@angular/router';
import { ServerCommunicationService } from './../../services/server-communication.service';
import { TProduct } from './../../../../../Server/src/@types/product.type';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-modify-product',
    templateUrl: './modify-product.component.html',
    styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {
    product: TProduct | undefined;

    constructor(
        private serverCommunicationService: ServerCommunicationService,
        private router: Router,
        private productService: ProductService,
        private storageService: StorageService
    ) {}

    ngOnInit(): void {
        const productToModify:
            | string
            | null = this.storageService.getProductToModify();
        if (!productToModify) {
            console.log(
                'Modify product page error : product to modify not valid'
            );
            this.router.navigateByUrl('/');
        } else {
            this.product = JSON.parse(productToModify);
        }
    }

    replaceProduct(product: string) {
        const newProduct = JSON.parse(product);
        if (this.productService.isProductValid(newProduct)) {
            this.serverCommunicationService
                .replaceProduct(newProduct as TProduct)
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
            alert('Impossible d\'envoyer le produit car il n\'est pas valide');
        }
    }
}
