//@flow

export type AppState = {
	products: {
		items: Array<Product>,
	},
	order: OrderState,
	login: LoginState,
	admin: AdminState
};

export type AdminState = {
	orders: Array<OrderState>,
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
	submittingOrder:boolean
}

export type Product = {
	name: string,
	quantity: number,
	price: string,
	description: string,
	type: string,
	imageFilename: string,
}



