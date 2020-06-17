

export const testData1 = {
	products: {
		items: [
			{
				name: "prod1",
				quantity: 1,
				price: 123,
				description: "asfd",
				type: "main",
				imageFilename: "pizza.png",
			},
			{
				name: "prod2",
				quantity: 2,
				price: 124,
				description: "fasfdasfd",
				type: "drink",
				imageFilename: "pizza.png",
			},
		]
	},
	order: {
		paymentType: "cash",
			deliveryType: "pickup",
			address: {
			name: "fasdfas",
				telephone: "1234444",
				street: "asdfasdfasdf",
				postcode: "sfdsd23",
				username: "asdfasdf"
		}
	},
	login: {
		loginToken: "should something be here?",
			role: "asfd",
			loggingIn: false,
	},
	user: Function, //??
}