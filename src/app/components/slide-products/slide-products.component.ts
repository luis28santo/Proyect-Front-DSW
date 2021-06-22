import { Component, Input, OnInit } from '@angular/core';
import { ProductResponse } from '../../interfaces/product-response';

declare var Swiper: any;

@Component({
	selector: 'app-slide-products',
	templateUrl: './slide-products.component.html',
	styleUrls: ['./slide-products.component.scss'],
})
export class SlideProductsComponent implements OnInit {
	@Input() products: ProductResponse[] = [];

	mySwiper: any;

	constructor() {}

	ngOnInit(): void {
		this.products = this.products.slice(2, 9).reverse();
	}
	ngAfterViewInit(): void {
		this.onSlide();
	}
	onSlide() {
		let container: Element = <Element>document.getElementById('castSlideshow');
		this.mySwiper = new Swiper(container, {
			effect: 'cube',
			grabCursor: true,
			cubeEffect: {
				shadow: true,
				slideShadows: true,
				shadowOffset: 20,
				shadowScale: 0.94,
			},
			loop: true,
			autoplay: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}
}
