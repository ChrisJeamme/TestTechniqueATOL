import { ModifyProductComponent } from './pages/modify-product/modify-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'modify-product', component: ModifyProductComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
