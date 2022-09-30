//@flow


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
	categories: Array<string>
}

export type AdminState = {
	Authorization?: Authorization, //??
	orderError?: string,
}

export type LoginState = {
	loginToken?: Authorization,
	loggingIn: boolean,
}

export type Authorization = {
	username: string,
	token: string,
	role?: string
};

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
	orderState: OrderStateType,
	paymentType: PaymentType,
	deliveryType: string,
	address?: Address,
	date?: Date,
	orderItems?: Array<ProductsState>
	creditCard?: CreditCardEntity,
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
	price: number,
	description: string,
	type?: string,
	imageFilename?: string,
	image?: any,
	quantity: number, //selected quantity
}


export type Category = {
	name:string
}


export type Address = {
	name: string,
	telephone: string,
	street: string,
	postcode: string,
	username: string,
	email: string
}



