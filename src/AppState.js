//@flow
import {PaymentType} from "./constants";

export type AppState = {
	products: {
		items: Array<Product>,
	},
	order: OrderState,
	login: LoginState,
};


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
}

// export type DeliveryType = "pickup" | "delivery"

// export type PaymentType = "cash" | "card"

export type Product = {
	name: string,
	quantity: number,
	price: string,
	description: string,
	type: string,
	imageFilename: string,
}



