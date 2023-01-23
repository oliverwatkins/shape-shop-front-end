import type {Product} from "../AppState";


/**
 * from order list
 */
export function calculateTotal2(products: any) {
	let t = products.reduce((acc: any, cur: Product) => {
		return acc + ((cur.amount ? cur.amount : 0) * cur.price);
	}, 0)

	t = t.toFixed(2);
	return t
}

/**
 * from product selection
 */
export function calculateTotal(selectedProducts?: Array<Product>) {

	if (selectedProducts) {
		let t = selectedProducts.reduce((acc: any, cur: Product) => {
			return acc + ((cur.amount ? cur.amount : 0) * cur.price);
		}, 0)

		t = (t).toFixed(2);
		return t
	}
	return 0;
}

