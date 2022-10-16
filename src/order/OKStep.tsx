import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import type {AppState} from "../AppState";
import {
	selectOrder,
} from "../selectors";
import {useDispatch, useSelector} from "react-redux";
import {createPlaceOrderAction} from "../admin/redux/productActions";
import {useEffect} from "react";
import {LoadingView} from "../misc/LoadingView";


export default function OKStep() {

	const dispatch = useDispatch();

	const order = useSelector(selectOrder);
	const orderError = useSelector((state: AppState)=> state.order && state.order.orderError);
	const submittingOrder = useSelector((state: AppState)=> state.order && state.order.submittingOrder);

	useEffect(() => {
		dispatch(createPlaceOrderAction(order));
		}, []);

	return (
		<div className={"okPanel"}>
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

