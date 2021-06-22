import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';

const routes: Routes = [
	{
		path: 'auth',
		component: AuthComponent,
	},
	{
		path: 'products',
		component: ProductsComponent,
	},
	{
	  path: 'product/:id',
	  component: ProductComponent,
	},
	{
		path: 'purchase',
		component: PurchaseComponent,
	  },
	{
		path: '**',
		redirectTo: '/products',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
