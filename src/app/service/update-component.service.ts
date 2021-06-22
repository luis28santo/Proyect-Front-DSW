import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UpdateComponentService {
	private _dataObs$ = new Subject();
	private _sesion = new Subject();

	getData() {
		return this._dataObs$;
	}

	updateData(data: boolean) {
		this._dataObs$.next(data);
	}

	getSession() {
		return this._sesion;
	}

	updateSession(data: boolean) {
		this._sesion.next(data);
	}
}
