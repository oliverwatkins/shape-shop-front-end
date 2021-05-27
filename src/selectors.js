import type {AppState, OrderState, Product, ProductsState} from "./AppState";

export const isUserLoggedIn = (state: AppState) => {
	return Boolean(state.login.loginToken && state.login.loginToken.role);
};

export const selectUserEmail = (state: AppState) => {
	return state.login.loginToken && state.login.loginToken.username;
};

export const selectProducts = (state: AppState) => state.products.items;

export const selectOpenOrders = (orders: Array<OrderState>) => orders.filter(o => o.state === "OPEN");

export const selectClosedOrders = (orders: Array<OrderState>) => orders.filter(o => o.state === "CLOSED");

export const selectProductType = (state: AppState, type: string) => state.products.items.filter(product => product.type === type);

export const selectSelectedProductType = (state: AppState, type: string) => state.products.items.filter(product => product.quantity > 0  && product.type === type);

//total order
export const selectOrder = (state: AppState) => {
	return {
		addressEntity: state.order && state.order.addressEntity,
		creditCardEntity: state.order && state.order.creditCardEntity,
		selectedProducts: selectSelectedProductType(state, "main"),
		selectedProducts2: selectSelectedProductType(state, "drinks"),
		deliveryType: state.order && state.order.deliveryType,
		paymentType: state.order && state.order.paymentType,
		submittingOrder: state.order && state.order.submittingOrder,
	}
}
