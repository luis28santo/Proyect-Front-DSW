import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcomerceService } from '../../service/ecormerce.service';
import { ProductResponse } from '../../interfaces/product-response';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	product: ProductResponse | undefined;

	constructor(
		private _activateRoute: ActivatedRoute,
		private _ecomerceService: EcomerceService,
		private _location: Location,
		private _router: Router
	) {}

	ngOnInit(): void {
		const { id } = this._activateRoute.snapshot.params;
		if (id) this.getProduct(id);
	}

	getProduct(id: string) {
		this._ecomerceService.getProductxId(id).subscribe((product) => (this.product = product));
	}

	onBack() {
		this._location.back();
	}

	addProduct() {
		let quantity: HTMLInputElement = <HTMLInputElement>document.getElementById('quantity');
		let pedido: any = {};

		if (quantity.value) {
			let cart: Object[] = JSON.parse(localStorage.getItem('cart') || '[]');
			const existingProduct: any = cart.find((item: any) => item.Product.ProductId === this.product?.ProductId);

			if (!existingProduct) {
				pedido = {
					Product: this.product,
					Quantity: +quantity.value,
				};
				cart.push(pedido);
			} else {
				console.log(existingProduct);

				existingProduct.Quantity = +quantity.value;
			}

			localStorage.setItem('cart', JSON.stringify(cart));
			quantity.value = '';
			this.alert();
		}
	}
	alert() {
		Swal.fire({
			title: 'Producto Agregado Correctamente',
			text: '¿Qué quieres hacer ahora?',
			icon: 'success',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ver Carrito',
			cancelButtonText: 'Volver a tienda',
		}).then((result) => {
			if (result.isConfirmed) {
				this._router.navigateByUrl('/purchase');
			} else {
				this._router.navigateByUrl('/products');
			}
		});
	}
}
