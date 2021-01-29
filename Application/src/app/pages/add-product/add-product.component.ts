import { Component, OnInit } from '@angular/core';
import { TProduct } from 'src/app/@types/product.type';
import { ProductService } from 'src/app/services/product.service';
import { ServerCommunicationService } from 'src/app/services/server-communication.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  newProduct: TProduct;

  isChecked = true;

  constructor(
    private serverCommunicationService: ServerCommunicationService,
    private productService: ProductService,
  ) {
    this.newProduct = {
      name: 'AC1 Phone1',
      type: 'phone',
      price: 200.05,
      rating: 3.8,
      warrantyYears: 1,
      available: true,
    };
  }

  ngOnInit(): void {}

  addProduct() {
    if (this.productService.isProductValid(this.newProduct)) {
      this.serverCommunicationService
        .addProduct(this.newProduct as TProduct)
        .subscribe(
          (result) => {
            console.log(result);
          },
          (err) => {
            console.log('Error : ', err);
          }
        );
    } else {
      console.log("Impossible d'envoyer le produit car il n'est pas valide");
    }
  }
}
