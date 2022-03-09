//@flow

import {selectClosedOrders, selectOpenOrders, selectProductsByType} from "./selectors";

export type Authorization = {
	username: string,
	token: string,
	role?: string
};

export type AppState = {
	products: ProductsState,
	order: OrderState,
	login: LoginState,
	admin: AdminState
};

export type ProductsState = {
	productsError: string,
	updatingProduct: boolean,
	items: Array<Product>,
}

export type AdminState = {
	orders: Array<OrderState>,
	orderError?: string,
	closedOrders: Array<OrderState>,
	products1: Array<Product>,
	products2: Array<Product>,
	Authorization: any, //??
}

export type LoginState = {
	// loginError: string,
	loginToken?: {
		token: string,
		username: string,
		role?: string
	},
	// role?: string, //??
	loggingIn: boolean,
}


export enum PaymentType {
	cash = "CASH",
	card = "CARD"
}

export enum DeliveryType {
	pickup = "PICKUP",
	delivery = "DELIVERY"
}

export enum OrderStateType {
	OPEN = "OPEN",
	CLOSED = "CLOSED"
}


export type OrderState = {
	id?: string,
	state: OrderStateType,
	paymentType: PaymentType,
	deliveryType: string,
	addressEntity?: Address,
	date?: Date,
	orderItems?: Array<ProductsState>
	creditCardEntity?: CreditCardEntity,
	submittingOrder?:boolean,
	orderError?:string,
}

export type CreditCardEntity = {
	number: string,
	expDate: string,
	name: string,
	type: string,
}

export type Product = {
	id?: string,
	name: string,
	quantity?: number, //selected quantity
	price: number,
	description: string,
	type?: string,
	imageFilename?: string,
	image?: any,
}

export type Address = {
	name: string,
	telephone: string,
	street: string,
	postcode: string,
	username: string,
	email: string
}



