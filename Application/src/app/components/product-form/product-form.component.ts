import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TProduct } from 'src/app/@types/product.type';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
    @Input() product: any;
    @Output() validateEvent = new EventEmitter<string>();

    constructor() {
        if (this.product === undefined) {
            console.log('Product form : Undefined product input');
        }
    }

    validate(product: TProduct) {
        this.validateEvent.emit(JSON.stringify(product));
    }

    ngOnInit(): void {}
}
