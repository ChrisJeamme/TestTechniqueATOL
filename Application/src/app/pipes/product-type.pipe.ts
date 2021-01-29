import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productType',
})
export class ProductTypePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'phone':
        return 'Téléphone';
      case 'computer':
        return 'Ordinateur';
      default:
        return 'Inconnu';
    }
  }
}
