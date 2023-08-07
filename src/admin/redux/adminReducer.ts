import type {AdminState, OrderState} from "../../AppState";
import {AnyAction} from "redux";
import {createAction} from "@reduxjs/toolkit";

export const AdminActions = {
	FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
	FETCH_ORDERS_FAIL: 'FETCH_ORDERS_FAIL',
};

export const fetchOrdersSuccessAction = createAction<{ data: OrderState[] }>(AdminActions.FETCH_ORDERS_SUCCESS);
export const fetchOrdersFailAction = createAction<{ errorMessage: string }>(AdminActions.FETCH_ORDERS_FAIL);

export function reducer(state: AdminState = {orders: []}, action: AnyAction): AdminState {
	if (fetchOrdersSuccessAction.match(action)) {
		return {
			...state,
			orders: action.payload.data
		}
	}
	if (fetchOrdersFailAction.match(action)) {
		return {
			...state,
			orders: [],
			orderError: action.payload.errorMessage
		};
	}
	return state;
}