import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateComponentService } from '../../service/update-component.service';
import { EcomerceService } from '../../service/ecormerce.service';
import { IClient } from '../../interfaces/client';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	showForm: boolean = false;
	formLogin!: FormGroup;
	formCreateClient: FormGroup;

	constructor(
		private _updateComponent: UpdateComponentService,
		private _fb: FormBuilder,
		private _ecomerceService: EcomerceService,
		private _router: Router
	) {
		this.formLogin = _fb.group({
			Email: ['', [Validators.required, Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,}$')]],
			Password: ['', [Validators.required]],
		});

		this.formCreateClient = _fb.group({
			FirstName: ['', [Validators.required]],
			LastName: ['', [Validators.required]],
			Email: ['', [Validators.required, Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,}$')]],
			Password: ['', [Validators.required]],
		});
	}

	ngOnInit(): void {
		this._updateComponent.getData().subscribe((data) => {
			this.showForm = data as boolean;
		});
	}

	invalidLogin(name: any) {
		let validated: boolean | undefined = this.formLogin.get(name)?.invalid && this.formLogin.get(name)?.touched;
		return validated;
	}

	invalidCreateCliente(name: any) {
		let validated: boolean | undefined = this.formCreateClient.get(name)?.invalid && this.formCreateClient.get(name)?.touched;
		return validated;
	}

	onLogin() {
		if (this.formLogin.invalid) {
			Object.values(this.formLogin.controls).forEach((control) => control.markAllAsTouched());
		} else {
			let client: IClient = this.formLogin.value;
			console.log(client);
			this._ecomerceService.loginClient(client).subscribe(
				(data) => {
					console.log(data);
					if (data.ClientId) {
						this.entrarCliente(data);
					} else {
						this.onAlert('Uno de los Campos Es Incorrecto', 'Error', 'error');
					}
				},
				(err) => this.onAlert(err, 'Error', 'error')
			);
		}
	}
	onCreateClient() {
		if (this.formCreateClient.invalid) {
			Object.values(this.formCreateClient.controls).forEach((control) => control.markAllAsTouched());
		} else {
			let client: IClient = this.formCreateClient.value;
			this._ecomerceService.registerClient(client).subscribe(
				(data) => {
					this.entrarCliente(client);
				},
				(err) => this.onAlert(err, 'Error', 'error')
			);
		}
	}

	entrarCliente(client: IClient) {
		localStorage.setItem('client', JSON.stringify(client));
		this._router.navigateByUrl('/products');
		this._updateComponent.updateSession(false);
	}

	onAlert(resp: any, title: string, icon: 'success' | 'error') {
		Swal.fire({
			icon: icon,
			title: title,
			text: `${resp}`,
		});
	}
}
