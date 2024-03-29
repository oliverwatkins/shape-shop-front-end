export type AppState = {
	products: ProductsState,
	order: OrderState, //current order
	login: LoginState,
	admin: AdminState,

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
	amount?: number, //selected quantity
	categories?: Array<Category>
	categoriesForForm?: Array<string> | string //needed for form
	sashText?: string

}

export type ByCategory = { [cat: string]: Array<Product> };


export type AdminState = {
	Authorization?: Authorization, //??
	orderError?: string,
	orders: OrderState[]
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
	CASH = "CASH",
	CARD = "CARD"
}

export enum DeliveryType {
	PICKUP = "PICKUP",
	DELIVERY = "DELIVERY"
}

export enum OrderStateType {
	OPEN = "OPEN",
	CLOSED = "CLOSED"
}

//todo rename to order
export type OrderState = {
	id?: string,
	selectedProducts: Array<Product>,
	orderState?: OrderStateType,
	paymentType?: PaymentType,
	deliveryType?: DeliveryType,
	address?: Address,
	date?: Date,
	orderItems: Array<{product: Product, amount?: number}>,
	creditCard?: CreditCardEntity,
	submittingOrder?:boolean,
}

export type CreditCardEntity = {
	number: string,
	expDate: string,
	name: string,
	type: string,
}

export type Category = {
	id: string
	name:string,
}

export type Address = {
	name: string,
	telephone: string,
	street: string,
	postcode: string,
	username: string,
	email: string
}
