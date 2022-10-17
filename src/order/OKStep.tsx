import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import type {AppState} from "../AppState";
import {
	selectOrder,
} from "../selectors";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {LoadingView} from "../misc/LoadingView";
import {placeOrderAction} from "../admin/redux/orderReducer";
import {api} from "../api/api";
import {Notify} from "../notify";
import {useAsync} from "react-async-hook";
import {getTests} from "../playground/asynchExample/service";
import {Test} from "../playground/asynchExample/UserDebitCards";
import {CircularProgress} from "@mui/material";


export default function OKStep() {

	const order = useSelector(selectOrder);
	const orderError = useSelector((state: AppState)=> state.order && state.order.orderError);
	const submittingOrder = useSelector((state: AppState)=> state.order && state.order.submittingOrder);

	const orderItemsX = useSelector((state: AppState) => state.products.allProducts.filter(e => {
		if (e.amount)
			return e.amount > 0
		return false
	}))

	order.orderItems = orderItemsX.map(elem => {
		return {product: elem, amount:elem.amount}
	});
	// order.orderItems = orderItems


	const {
		loading: loading,
		error: error,
		result: result = null,
	} = useAsync<any>(api.placeOrder, [order]);


	useEffect( () => {
		if (result)
			Notify.success("got result " + result)
	},[result])

	useEffect( () => {
		if (error)
			Notify.error("got error " + error);

	},[error])

	useEffect( () => {
		// if (loading)
		// 	alert("loading" + loading)

	},[loading])

	//
	//
	//
	// useEffect( () => {
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	// 	//TODO not working asyncronoulsy
	// 	try {
	// 		let l = api.placeOrder(order)
	//
	// 		Notify.success("Success");
	//
	// 		// 	.catch((e: any) => {
	// 		//
	// 		// 	console.error(e)
	// 		// 	Notify.error("Error " + order.id);
	// 		// 	Notify.error(e);
	// 		//
	// 		// 	// console.error
	// 		// });
	//
	//
	// 	}catch(e) {
	// 		Notify.error("Error sending order " + order.id);
	// 	// dispatch(placeOrderAction({value:order}));
	//
	// 	}
	// 	}, []);

	return (
		<div className={"okPanel"}>
			{loading && <CircularProgress color="primary"/>}
			{orderError && <span className={"error"}>{orderError}</span>}
			{submittingOrder && <LoadingView msg={"Placing Order"}/>}
			{!submittingOrder && !orderError &&
			<div>
				<div>
					<h1>OK</h1>
				</div>
				Order has been placed!
				<div>
					<FontAwesomeIcon size={"10x"} color={"green"} className={"icon"} icon={faCheckCircle}/>
				</div>
			</div>
			}
		</div>
	);
}

