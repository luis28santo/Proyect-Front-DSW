import { Component, OnInit } from '@angular/core';
import { EcomerceService } from '../../service/ecormerce.service';
import { ProductResponse } from '../../interfaces/product-response';
import { IClient } from '../../interfaces/client';
import { Router } from '@angular/router';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
	products: ProductResponse[] = [];
	constructor(private _ecomerceService: EcomerceService, private _router: Router) {}

	ngOnInit(): void {
		this._ecomerceService.getProducts().subscribe((data) => {
			this.products = data;
		});
		this.validateSession();
	}
	validateSession() {
		let client: IClient = JSON.parse(localStorage.getItem('client') || '{}');
		let validate: Boolean = Object.entries(client).length === 0;

		if (validate) {
			this._router.navigateByUrl('/auth');
		}
	}
}
