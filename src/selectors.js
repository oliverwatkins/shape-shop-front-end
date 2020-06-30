import type {Product} from "./AppState";

export const isUserLoggedIn = (state) => {
	return Boolean(state.login.loginToken && state.login.loginToken.role);
};

export const selectProduct = (state) => {
	return state.login.loginToken.role;
};

export const selectUserRole = (state) => {
	return state.login.loginToken.role;
};

export const selectAuthorization = (state) => {
	return state.login.loginToken.token;
};

export const selectUserEmail = (state) => {
	return state.login.loginToken && state.login.loginToken.username;
};

export const selectProducts = (state) => state.products;

export const selectProductById = (state, id) => state.products.filter(product => product.id === id);

export const selectSelectedProducts = (state) => state.products.items.filter(product => product.quantity > 0  && product.type === "main");

export const selectSelectedDrinks = (state) => state.products.items.filter((product: Product ) => product.quantity > 0 && product.type === "drinks");

export const selectMains = (state) => state.products.items.filter(product => product.type === "main");

export const selectDrinks = (state) => state.products.items.filter(product => product.type === "drinks");

//total order
export const selectOrder = (state) => {
	return {
		address: state.order && state.order.address,
		selectedProducts: selectSelectedProducts(state),
		selectedDrinks: selectSelectedDrinks(state),
		deliveryType: state.order && state.order.deliveryType,
		paymentType: state.order && state.order.paymentType,
		submittingOrder: state.order && state.order.submittingOrder,
	}
}


// address: state.order && state.order.address,
// 	selectedProducts: selectSelectedProducts(state),
// 	selectedDrinks: selectSelectedDrinks(state),
// 	deliveryType: state.order && state.order.deliveryType,
// 	paymentType: state.order && state.order.paymentType,
// 	submittingOrder: state.order && state.order.submittingOrder,



// products: selectMains(state),
// 	drinks: selectDrinks(state),
