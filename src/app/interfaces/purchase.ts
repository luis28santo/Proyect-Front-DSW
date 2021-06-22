export interface IPurchase {
	ClientId: number;

	items: Item[];
}
export interface Item {
	ProductId?: number;

	Quantity?: number;
}
