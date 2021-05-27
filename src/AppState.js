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
	loginToken: {
		role: string,
		token: string,
		username: string
	},
	role: string, //??
	loggingIn: boolean,
}

export type OrderState = {
	state: string,
	paymentType: string,
	deliveryType: string,
	addressEntity: {
		name: string,
		telephone: string,
		street: string,
		postcode: string,
		username: string
	},
	creditCardEntity: {
		number: string,
		expDate: string,
		name: string,
		type: string,
	},
	submittingOrder:boolean,
	orderError:string,
}

export type Product = {
	id: string,
	name: string,
	quantity: number,
	price: string,
	description: string,
	type: string,
	imageFilename: string,
}



