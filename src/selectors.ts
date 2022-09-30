import type {AppState, OrderState} from "./AppState";

export const isUserLoggedIn = (state: AppState) => {
	return Boolean(state.login.loginToken && state.login.loginToken.role);
};

export const selectUserEmail = (state: AppState) => {
	return state.login.loginToken && state.login.loginToken.username;
};

export const selectAllProducts = (state: AppState) => state.products.items;

export const selectOpenOrders = (orders: Array<OrderState>) => orders.filter(o => o.orderState === "OPEN");

export const selectClosedOrders = (orders: Array<OrderState>) => orders.filter(o => o.orderState === "CLOSED");

export const selectProductsByType = (state: AppState, type: string) => state.products.items.filter(product => product.type === type);

export const selectSelectedProductByType = (state: AppState, type: string) => state.products.items.filter(product => product.quantity && product.quantity > 0  && product.type === type);




//total order
export const selectOrder = (state: AppState) => {
	return {
		state: state.order.orderState,
		addressEntity: state.order && state.order.address,
		creditCardEntity: state.order && state.order.creditCard,
		selectedProducts: selectSelectedProductByType(state, "main"),
		selectedProducts2: selectSelectedProductByType(state, "drinks"),
		deliveryType: state.order && state.order.deliveryType,
		paymentType: state.order && state.order.paymentType,
		submittingOrder: state.order && state.order.submittingOrder,
	}
}
