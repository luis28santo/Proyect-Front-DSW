import { Component, Input, OnInit } from '@angular/core';
import { ProductResponse } from '../../interfaces/product-response';
import { EcomerceService } from '../../service/ecormerce.service';
import { CategoryResponse } from '../../interfaces/category-response';
import { Router } from '@angular/router';

@Component({
	selector: 'app-list-products',
	templateUrl: './list-products.component.html',
	styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
	@Input() products: ProductResponse[] = [];
	categories: CategoryResponse[] = [];
	activeCategory: string = 'todos';
	listProducts: ProductResponse[] = [];

	constructor(private _ecomerceService: EcomerceService, private _router: Router) {}

	ngOnInit(): void {
		this.listProducts = [...this.products];
		this.getCategories();
		// console.log(this.products);
	}

	getCategories() {
		this._ecomerceService.getCategories().subscribe((category) => (this.categories = category));
	}

	allProducts() {
		this.activeCategory = 'todos';
		this.listProducts = [...this.products];
	}

	filterProducts(category: CategoryResponse) {
		this.activeCategory = category.Name;
		this._ecomerceService.getProductsxCategory(`${category.CategoryId}`).subscribe((products) => {
			this.listProducts = products;
		});
	}

	showMore(product: ProductResponse) {
		this._router.navigate(['/product', product.ProductId]);
	}
}
