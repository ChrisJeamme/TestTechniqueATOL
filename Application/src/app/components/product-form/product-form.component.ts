import { EventEmitter, Input, Output, Component } from '@angular/core';
import { TProduct } from 'src/app/@types/product.type';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
    @Input() product: any;
    @Output() validateEvent = new EventEmitter<string>();

    validate(product: TProduct) {
        this.validateEvent.emit(JSON.stringify(product));
    }
}
