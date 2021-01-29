import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
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
    private router: Router,
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

  toggleAvailable()
  {
    if(this.isChecked != this.newProduct.available)
    {
      this.newProduct.available = !this.newProduct.available
      console.log('a')
    }
  }

  ngOnInit(): void {}

  addProduct() {
    if (this.productService.isProductValid(this.newProduct)) {
      this.serverCommunicationService
        .addProduct(this.newProduct as TProduct)
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
      console.log("Impossible d'envoyer le produit car il n'est pas valide");
    }
  }
}
