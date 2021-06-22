import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClient } from '../../interfaces/client';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
	constructor(private _router: Router) {}

	ngOnInit(): void {
		let client: IClient = JSON.parse(localStorage.getItem('client') || '{}');
		let validate: Boolean = Object.entries(client).length === 0;

		if (!validate) {
			this._router.navigateByUrl('/products');
		}
	}
}
