import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { ServerCommunicationService } from './../../services/server-communication.service';
import { Component, OnInit } from '@angular/core';
import { TProducts } from 'src/app/@types/products.type';
import { TProduct } from 'src/app/@types/product.type';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    products: TProducts | undefined;
    constructor(
        private serverCommunicationService: ServerCommunicationService,
        private productService: ProductService,
        private storageService: StorageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.serverCommunicationService
            .getProducts()
            .subscribe((productsContainer: any) => {
                this.products = productsContainer.products;
                console.log(this.products);
            });
    }

    replaceProduct(product: TProduct) {
        if (this.productService.isProductValid(product)) {
            this.serverCommunicationService.replaceProduct(product).subscribe(
                (result) => {
                    console.log(result);
                },
                (err) => {
                    console.log('Error replace product : ', err);
                }
            );
        } else {
            console.log(
                "Impossible d'envoyer le produit car il n'est pas valide"
            );
        }
    }

    deleteProduct(product: TProduct) {
        if (confirm('Voulez-vous vraiment supprimer le produit ?')) {
            this.serverCommunicationService.deleteProduct(product).subscribe(
                (result) => {
                    console.log(result);
                    this.products?.forEach((productPage, i) => {
                        if (productPage.id === product.id) {
                            this.products?.splice(i, 1);
                        }
                    });
                },
                (err) => {
                    console.log('Error delete product : ', err);
                }
            );
        }
    }

    openModificationProduct(product: TProduct) {
        this.storageService.setProductToModify(product);
        this.router.navigateByUrl('/modify-product');
    }
}
