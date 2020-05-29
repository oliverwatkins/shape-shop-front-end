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
	return state.login.loginToken.email;
};

export const selectProducts = (state) => state.products;

export const selectProductById = (state, id) => state.products.filter(product => product.id === id);

export const selectSelectedProducts = (state) => state.products.items.filter(product => product.quantity > 0  && product.type === "main");

export const selectSelectedDrinks = (state) => state.products.items.filter((product: Product ) => product.quantity > 0 && product.type === "drinks");

export const selectMains = (state) => state.products.items.filter(product => product.type === "main");

export const selectDrinks = (state) => state.products.items.filter(product => product.type === "drinks");


// products: selectMains(state),
// 	drinks: selectDrinks(state),
