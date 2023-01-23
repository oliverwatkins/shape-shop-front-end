import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import type {AppState} from "../../AppState";
import {
	selectOrder,
} from "../../selectors";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {LoadingView} from "../../misc/LoadingView";
import {api} from "../../api/api";
import {Notify} from "../../notify";
import {useAsync} from "react-async-hook";
import {CircularProgress} from "@mui/material";

import "./okStep.scss";

export default function OKStep() {

	const order = useSelector(selectOrder);
	const submittingOrder = useSelector((state: AppState)=> state.order && state.order.submittingOrder);

	const orderItemsX = useSelector((state: AppState) => state.products.allProducts.filter(e => {
		if (e.amount)
			return e.amount > 0
		return false
	}))

	order.orderItems = orderItemsX.map(elem => {
		return {product: elem, amount:elem.amount}
	});

	const {
		loading: loading,
		error: error,
		result: result = null,
	} = useAsync<any>(api.createOrder, [order]); //TODO deprecated, use nmormal async await

	useEffect( () => {
		if (result)
			Notify.success("Success!")
	},[result])

	useEffect( () => {
		if (error)
			Notify.error("Error : " + error);
	},[error])

	return (
		<div className={"okPanel"}>
			{loading && <CircularProgress color="primary"/>}
			{error && <span className={"error"}>{error}</span>}
			{submittingOrder && <LoadingView msg={"Placing Order"}/>}
			{!submittingOrder && !error &&
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

