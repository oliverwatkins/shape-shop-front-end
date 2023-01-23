
//todo

import type {AppState, Category, OrderState, Product} from "./AppState";

export const isUserLoggedIn = (state: AppState) => {
	return Boolean(state.login.loginToken && state.login.loginToken.role);
};

export const selectUserEmail = (state: AppState) => {
	return state.login.loginToken && state.login.loginToken.username;
};

export const selectAllProducts = (state: AppState) => state.products.allProducts;

export const selectOpenOrders = (orders: Array<OrderState>) => orders.filter(o => o.orderState === "OPEN");

export const selectClosedOrders = (orders: Array<OrderState>) => orders.filter(o => o.orderState === "CLOSED");

export const selectProductsByType = (state: AppState): Array<Product> => state.products.allProducts;

export const selectCategories = (state: AppState): Array<Category> => state.products.categories;

//TODO memoise with createSelector
export const selectCategoriesFromProducts = (state: AppState): Array<Category> => {

	if (state.products && state.products.categoryProducts) {
		let catnames = Object.keys(state.products.categoryProducts);

		return state.products.categories.filter(e => catnames.includes(e.name))
	}
	return state.products.categories;
}

export const selectSelectedProducts = (state: AppState): Array<Product>  => state.products.allProducts.filter(product => product.amount && product.amount > 0)

//total order
export const selectOrder = (state: AppState): OrderState => {
	return {
		orderState: state.order.orderState,
		address: state.order && state.order.address,
		creditCard: state.order && state.order.creditCard,
		orderItems: state.order.orderItems,
		selectedProducts: selectSelectedProducts(state),
		deliveryType: state.order && state.order.deliveryType,
		paymentType: state.order && state.order.paymentType,
		submittingOrder: state.order && state.order.submittingOrder,
	}
}
