import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from '../interfaces/product-response';
import { CategoryResponse } from '../interfaces/category-response';
import { IPurchase } from '../interfaces/purchase';
import { IClient } from '../interfaces/client';

@Injectable({
	providedIn: 'root',
})
export class EcomerceService {
	private baseUrl: string = 'https://localhost:44391';

	constructor(private _http: HttpClient) {}

	getProducts(): Observable<ProductResponse[]> {
		return this._http.get<ProductResponse[]>(`${this.baseUrl}/products`);
	}

	getCategories(): Observable<CategoryResponse[]> {
		return this._http.get<CategoryResponse[]>(`${this.baseUrl}/categories`);
	}

	getProductsxCategory(id: string): Observable<ProductResponse[]> {
		return this._http.get<ProductResponse[]>(`${this.baseUrl}/products?categoryId=${id}`);
	}

	getProductxId(id: string): Observable<ProductResponse> {
		return this._http.get<ProductResponse>(`${this.baseUrl}/products/${id}`);
	}

	purchase(purchase: IPurchase) {
		return this._http.post<IPurchase>(`${this.baseUrl}/purchase`, purchase);
	}

	registerClient(client: IClient) {
		return this._http.post<IClient>(`${this.baseUrl}/signup`, client);
	}

	loginClient(client: IClient) {
		return this._http.post<IClient>(`${this.baseUrl}/login`, client);
	}
}
