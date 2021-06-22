import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoginComponent } from './components/login/login.component';
import { ComponentsModule } from './components/components.module';
import { AuthComponent } from './pages/auth/auth.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';

@NgModule({
	declarations: [AppComponent, AuthComponent, ProductsComponent, ProductComponent, PurchaseComponent],
	imports: [BrowserModule, HttpClientModule, AppRoutingModule, ComponentsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
