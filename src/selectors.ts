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

//deprecated
// export const selectProductsByType = (state: AppState, type: string) => state.products.allProducts.filter(product => product.type === type);
export const selectProductsByType = (state: AppState, type: string): Array<Product> => state.products.allProducts;
//
// export const selectProductsByType = (state: AppState, type: string) => state.products.allProducts.filter(product => product.type === type);

export const selectCategories = (state: AppState): Array<Category> => state.products.categories;


//deprecated
// export const selectSelectedProductByType = (state: AppState, type: string) => state.products.allProducts.filter(product => product.quantity && product.quantity > 0  && product.type === type);
export const selectSelectedProductByType = (state: AppState): Array<Product>  => state.products.allProducts.filter(product => product.quantity && product.quantity > 0) //  && product.type === type);


export const selectSelectedProducts = (state: AppState): Array<Product>  => state.products.allProducts.filter(product => product.quantity && product.quantity > 0)



// selectOrder

export const selectOrder2 = (state: AppState): OrderState => {
	return state.order;
}

//total order
export const selectOrder = (state: AppState): OrderState => {
	return {
		orderState: state.order.orderState,
		address: state.order && state.order.address,
		creditCard: state.order && state.order.creditCard,
		orderItems: state.order.orderItems,
		selectedProducts: selectSelectedProductByType(state),

		//@deprecated
		// selectedProducts: selectSelectedProductByType(state, "main"),
		// //@deprecated
		// selectedProducts2: selectSelectedProductByType(state, "drinks"),
		deliveryType: state.order && state.order.deliveryType,
		paymentType: state.order && state.order.paymentType,
		submittingOrder: state.order && state.order.submittingOrder,
	}
}
