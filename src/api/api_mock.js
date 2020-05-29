/**
 * Mock API for running/testing my-wee standalone.
 */
const create = () => {

	const BUSINESS_TOKEN =
		'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiTUVSQ0hBTlQiLCJleHAiOjE1NTAyNDc5MjAsInN0YXR1cyI6ImFjdGl2ZSJ9.Y0Qg1meZb2t7fUFLJ9l0WN-smsN1Wrg7bgXVlKLA26O2SM5l_NYGQ6NXy3d16QGAiyFOyV0wKN6DvDjDfUPn5g';
	const CUSTOMER_TOKEN =
		'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiQ1VTVE9NRVIiLCJleHAiOjE1NDk1NTMxMjd9.U3LaGUbk8oq9sGB_PCzh05i1Xwlat2vAOa7x2toCM6pIUWx4_4eZoWIFRtj9nPBBvpBbxX7NcbFjrv2C1lkpAw';

	const loginUser = credentials => {
		let response = {
			ok: true,
			status: 200,
			headers: {
				authorization: BUSINESS_TOKEN,
			},
		};
		return response;
	};

	const logoutUser = Authorization => {
		return 'todo';
	};

	const customerDetails = Authorization => {
		return {
			status: 200,
			data: {
				email: "asdf@asdf.com",
				lastName: "asdfasdf"
			},
		};
	};

	const adminDetails = Authorization => {
		return {
			status: 200,
			data: {
				email: "asdf@asdf.com",
				lastName: "asdfasdf"
			},
		};
	};

	const fetchProducts = () => {
		return {
			status: 200,
			data: [{
				"id": 7,
				"name": "Minestone - italienische Gemüsesuppe mit Basilikumpesto",
				"price": 4.50,
				"type": "main"
			}, {
				"id": 8,
				"name": "Gegrillte Calamari gefüllt mit Zucchini und Paprika auf Aurberginen-Püree",
				"price": 7.90, "type": "main"
			},
				{
					"id": 9,
					"name": "Zucchiniröllchen gefüllt mit Ziegenkäse und Honig auf Rucolasalat mit Roten Beten und gerösteten Mandeln",
					"price": 7.90, "type": "main"
				},
				{
					"id": 10,
					"name": "Lachs-Spinat-Lasagne",
					"price": 10.90, "type": "main"
				},
				{
					"id": 11,
					"name": "Lasagna Classica al Forno mit Hackfleisch",
					"price": 9.90, "type": "main"
				}, {
					"id": 12,
					"name": "Ravioli gefüllt mit Bärlauch und Ricotta in Zitronenbutter mit Spargel",
					"price": 11.90, "type": "main"
				}, {
					"id": 13, "name": "Hausgemachte Rosmarin-Gnocchi mit Hirschragout", "price": 11.90, "type": "main"
				}, {
					"id": 14,
					"name": "Fritto misto di Verdura – frittierter Blumenkohl, Zucchini, Champignons, Paprika, Aubergine und Artischockenherz mit Knoblauchmayonnaise und Kräuterkartoffeln",
					"price": 12.90,
					"type": "main"
				}, {
					"id": 15,
					"name": "Pizza mit grünem und Weißem Spargel und Kirschtomaten",
					"price": 10.90
				}, {
					"id": 16,
					"name": "Pizza mit Mortadella, Burrata und Trüffelcreme",
					"price": 10.90,
					"type": "main"
				}, {
					"id": 17, "name": "Pizza mit Kirschtomaten, Burrata und Basilikum-Pesto", "price": 10.90, "type": "main"
				}, {
					"id": 18,
					"name": "Saltimbocca alla Romana – Kalbslendenmedaillons mit Salbei und Parmaschinken in Weißweinsauce, dazu Kartoffel-Gemüse-Gratin",
					"price": 13.90, "type": "main"
				}, {
					"id": 19,
					"name": "Gegrillte Spieße mit Salsiccia, Hähnchenbrust, Rinderlende und Zwiebeln, dazu hausgemachte Barbecuesauce und Kräuterkartoffeln",
					"price": 13.90, "type": "main"
				}, {
					"id": 20,
					"name": "Fritto Misto di Pesce -  frittierte Fische und Meeresfrüchte mit Knoblauch-Mayonnaise und Kräuterkartoffeln",
					"price": 13.90, "type": "main"
				}, {
					"id": 21, "name": "Mango-Panna Cotta mit Erdbeersalat", "price": 4.50, "type": "main"
				},


				{"id": 22, "name": "Grillo 'Lustru' IGP Cantine Europa, Sizilien 0,75 l", "price": 16.30, "type": "drinks"},
				{"id": 23, "name": "Sauvignon ‘Matusin’ Walter Nardin, Veneto 0,75 l", "price": 20.50, "type": "drinks"},
				{"id": 24, "name": "Grauburgunder Weingut Braun, Pfalz 0,75 l", "price": 22.70, "type": "drinks"},
				{"id": 25, "name": "Lugana Villa Trendi, Gardasee 0,75 l", "price": 22.70, "type": "drinks"},
			]
		};
	};

	return {
		loginUser,
		fetchProducts
	};
};

export default {
	create,
};
