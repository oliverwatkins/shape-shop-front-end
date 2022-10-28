import {AppState} from "../../AppState";


export function getData(): AppState {
	return {

		login: {
			loggingIn: false,
			loginToken: {
				username: "itdoesntmatter",
				token: "itdoesntmatter",
			},
			// logout: 'IN_PROGRESS'
		},
		products: {
			categories: [
				{
					id: "1",
					name: 'main'
				},
				{
					id: "2",
					name: 'drinks'
				}
			],
			allProducts: [
				{
					id: "13",
					name: 'Lachs-Lasagne',
					price: 10.9,
					description: 'Lachs-Spinat-Lasagne',
					imageFilename: 'lachs_spinat.jpg',
					categories: [
						{
							id: "1",
							name: 'main'
						}
					]
				},
				{
					id: "14",
					name: 'Calamari',
					price: 4.5,
					description: 'Gegrillte Calamari gefÃ¼llt mit Zucchini und Paprika auf Aurberginen-PÃ¼ree',
					imageFilename: 'calamari.jpg',
					categories: [
						{
							id: "1",
							name: 'main'
						}
					]
				},
				{
					id: "30",
					name: 'Wine',
					price: 16.3,
					description: 'Grauburgunder Weingut Braun, Pfalz 0,75 l',
					imageFilename: 'wine3.jpg',
					categories: [
						{
							id: "2",
							name: 'drinks'
						}
					]
				},
				{
					id: "31",
					name: 'Beer',
					price: 20.5,
					description: 'biaar',
					imageFilename: 'beer.jpg',
					categories: [
						{
							id: "2",
							name: 'drinks'
						}
					]
				}
			],
			productsError: '',
			updatingProduct: false,
			categoryProducts: {
				main: [
					{
						id: "13",
						name: 'Lachs-Lasagne',
						price: 10.9,
						imageFilename: 'lachs_spinat.jpg',
						description: 'Lachs-Spinat-Lasagne'
					},
					{
						id: "14",
						name: 'Calamari',
						price: 4.5,
						imageFilename: 'calamari.jpg',
						description: 'Gegrillte Calamari gefÃ¼llt mit Zucchini und Paprika auf Aurberginen-PÃ¼ree'
					},

				],
				drinks: [
					{
						id: "30",
						name: 'Wine',
						price: 16.3,
						imageFilename: 'wine3.jpg',
						description: 'Grauburgunder Weingut Braun, Pfalz 0,75 l',
					},
					{
						id: "31",
						name: 'Beer',
						price: 20.5,
						imageFilename: 'beer.JPG',
						description: 'biaar',
					}
				]
			}
		},
		order: {
			orderItems: [],
			selectedProducts: [],
			// orderState: 'OPEN',
			// paymentType: 'CASH',
			// deliveryType: 'PICKUP'
		},
		admin: {
			orders: []
		},
	}
}




//used in routing test : RoutingTest.test.js

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