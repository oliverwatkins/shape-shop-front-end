//@flow

export type AppState = {
	products: ProductsState,
	order: OrderState,
	login: LoginState,
	admin: AdminState
};

export type ProductsState = {
	productsError: string,
	items: Array<Product>,
}

export type AdminState = {
	orders: Array<OrderState>,
	orderError: string,
}

export type LoginState = {
	loginError: string,
	loginToken: string,
	role: string,
	loggingIn: boolean,
}

export type OrderState = {
	paymentType: string,
	deliveryType: string;
	address: {
		name: string,
		telephone: string,
		street: string,
		postcode: string,
		username: string
	}
	creditCard: {
		number: string,
		expDate: string,
		name: string,
		type: string,
	}
	submittingOrder:boolean,
	orderError:string,
}

export type Product = {
	name: string,
	quantity: number,
	price: string,
	description: string,
	type: string,
	imageFilename: string,
}



