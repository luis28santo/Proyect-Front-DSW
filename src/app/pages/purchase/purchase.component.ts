import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EcomerceService } from '../../service/ecormerce.service';
import { IPurchase } from '../../interfaces/purchase';

import Swal from 'sweetalert2';

@Component({
	selector: 'app-purchase',
	templateUrl: './purchase.component.html',
	styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
	myProducts: any[] = [];

	constructor(private _ecomerceService: EcomerceService, private _location: Location) {}

	ngOnInit(): void {
		this.loadProducts();
	}

	loadProducts() {
		let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
		if (cart.length) {
			this.myProducts = cart;

			setTimeout(() => {
				this.loadTotal(cart);
			}, 0);
		} else this.myProducts = [];
	}

	loadTotal(myProducts: any[]) {
		const textTotal = <HTMLElement>document.getElementById('total');
		let total: Number = 0;
		myProducts.forEach((product) => {
			total += product.Product.Price;
		});

		textTotal.innerText = 'S/. ' + total;
	}

	onPucharse() {
		let obj: IPurchase = {
			ClientId: 1,
			items: this.myProducts.map((item) => ({ ProductId: item.Product.ProductId, Quantity: item.Quantity })),
		};
		// fetch('https://localhost:44391/purchase', {
		// 	method: 'POST',
		// 	body: JSON.stringify(obj),
		// 	headers: { 'Content-Type': 'application/json' },
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => console.log(data))
		// 	.catch((err) => console.log(err));
		this._ecomerceService.purchase(obj).subscribe(
			(data) => {
				this.onAlert(data, 'success');
				localStorage.removeItem('cart');
				this.loadProducts();
			},
			(err) => this.onAlert(err, 'error')
		);
	}

	onDeleteProduct(product: any) {
		localStorage.removeItem('cart');
		this.myProducts.filter((item) => {
			if (item === product) {
				let i = this.myProducts.indexOf(item);
				this.myProducts.splice(i, 1);
				return;
			}
		});
		localStorage.setItem('cart', JSON.stringify(this.myProducts));

		setTimeout(() => {
			console.log(product);
		}, 500);
	}

	onBack() {
		this._location.back();
	}

	onAlert(resp: any, icon: 'success' | 'error') {
		Swal.fire({
			icon: icon,
			title: 'Compra Realizada',
			text: `${resp}`,
		});
	}
}
