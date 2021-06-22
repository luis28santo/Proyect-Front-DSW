import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateComponentService } from '../../service/update-component.service';
import { IClient } from '../../interfaces/client';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	showForm: boolean = false;
	hideButtons: boolean = true;
	client: IClient = undefined;

	constructor(private _updateComponent: UpdateComponentService, private _router: Router) {}

	ngOnInit(): void {
		this._updateComponent.getSession().subscribe((data) => {
			this.hideButtons = data as boolean;
			this.validateSession();
		});
		this.validateSession();
	}

	validateSession() {
		this.client = JSON.parse(localStorage.getItem('client'));
		if (!this.client) {
			// let validate: Boolean = Object.entries(this.client).length === 0;
			// if (validate) {
			this._router.navigateByUrl('/auth');
			// }
		}
	}

	onShowForm(value: boolean) {
		this.showForm = value;
		this._updateComponent.updateData(value);
	}

	navigatePurchase() {
		this._router.navigateByUrl('/purchase');
	}

	signOff() {
		localStorage.removeItem('client');
		window.location.reload();
		// console.log(this.client);
	}
}
