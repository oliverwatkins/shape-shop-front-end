import type {AdminState, OrderState} from "../../AppState";
import {AnyAction} from "redux";
import {createAction} from "@reduxjs/toolkit";

export const AdminActions = {
	// FETCH_ORDERS: 'FETCH_ORDERS',
	FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
	FETCH_ORDERS_FAIL: 'FETCH_ORDERS_FAIL',
};


export const createFetchOrdersSuccessAction = createAction<{ data: OrderState[] }>(AdminActions.FETCH_ORDERS_SUCCESS);
export const createFetchOrdersFailAction = createAction<{ errorMessage: string }>(AdminActions.FETCH_ORDERS_FAIL);

export function reducer(state: AdminState = {orders: []}, action: AnyAction): AdminState {
	if (createFetchOrdersSuccessAction.match(action)) {
		return {
			...state,
			orders: action.payload.data
		}
	}
	if (createFetchOrdersFailAction.match(action)) {
		return {
			...state,
			orders: [],
			orderError: action.payload.errorMessage
		};
	}
	return state;
}