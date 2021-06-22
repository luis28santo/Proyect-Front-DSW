import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SlideProductsComponent } from './slide-products/slide-products.component';
import { ListProductsComponent } from './list-products/list-products.component';

const LIST = [LoginComponent, NavbarComponent, SlideProductsComponent, ListProductsComponent];

@NgModule({
	declarations: [LIST],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [LIST],
	providers: [],
})
export class ComponentsModule {}
