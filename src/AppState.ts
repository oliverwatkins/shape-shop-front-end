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
	allProducts: Array<Product>,
	categoryProducts?: { [category: string]: Array<Product> }
	categories: Array<Category>
}

export type Product = {
	id: string,
	name: string,
	price: number,
	description: string,
	imageFilename?: string,
	image?: any, //??
	quantity?: number, //selected quantity
	categories?: Array<Category>
}

export type ByCategory = { [cat: string]: Array<Product> };


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

//todo rename to order
export type OrderState = {
	id?: string,
	selectedProducts: Array<Product>,
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

export type Category = {
	name:string,
	id: string
}


export type Address = {
	name: string,
	telephone: string,
	street: string,
	postcode: string,
	username: string,
	email: string
}



