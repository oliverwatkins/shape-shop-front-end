import type {AppState, Product} from "./AppState";

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

export const selectOpenOrders = (orders) => orders.filter(o => o.state === "OPEN");

export const selectClosedOrders = (orders) => orders.filter(o => o.state === "CLOSED");


export const selectProductById = (state, id) => state.products.filter(product => product.id === id);

export const selectProductType = (state, type) => state.products.items.filter(product => product.type === type);

export const selectSelectedProductType = (state, type) => state.products.items.filter(product => product.quantity > 0  && product.type === type);

//total order
export const selectOrder = (state: AppState) => {
	return {
		addressEntity: state.order && state.order.addressEntity,
		creditCardEntity: state.order && state.order.creditCardEntity,
		selectedProducts: selectSelectedProductType(state, "main"),
		selectedProducts2: selectSelectedProductType(state, "accessories"),
		deliveryType: state.order && state.order.deliveryType,
		paymentType: state.order && state.order.paymentType,
		submittingOrder: state.order && state.order.submittingOrder,
	}
}
