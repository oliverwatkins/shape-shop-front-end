import * as React from "react";
import {useEffect, useState} from "react";

import {faCreditCard, faHandHolding, faMoneyBill, faTruck} from "@fortawesome/free-solid-svg-icons";


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import {calculateTotal2} from "../order/utils";
import {
    Address, AppState,
    Authorization,
    DeliveryType,
    OrderState,
    OrderStateType,
    PaymentType, Product,
} from "../AppState";
import "./orderPanel.scss";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import {api} from "../api/api";
import {fetchOrdersSuccessAction} from "./redux/adminReducer";
import {ErrorPanel} from "../misc/ErrorPanel";
import {Notify} from "../notify";
import * as Constants from "../constants";

type Props = {
    type: OrderStateType,
    orders?: Array<OrderState>,
    Authorization?: Authorization
}

export default function OrderPanel(props: Props) {

    let dispatch = useDispatch();

    //TODO move to selectors
    let orders = useSelector((state: AppState) => state.admin.orders.filter(o => o.orderState === props.type));

    let [loading, setLoading] = useState<boolean>(false);
    let [error, setError] = useState<string>();

    useEffect(() => {
        setLoading(true)

        api.fetchOrders(props.Authorization, props.type).then((data: OrderState[]) => {
            dispatch(fetchOrdersSuccessAction({data: data}));
        }).catch((error: { message: any; }) => {
            Notify.error(`Error fetching orders : ${error.message}`);
            setError(error.message)
        }).finally(() => {
            setLoading(false)
            // setLoading(false)
        });
    }, []);

    return (
        <>
            {loading && <CircularProgress color="primary"/>}
            {error &&
                <ErrorPanel message={"ERROR order error: " +  error}/>
            }
            <table className={"orderTable"}>
                <thead>
                {/*<tbody>*/}
                <tr>
                    <th>
                        id
                    </th>
                    <th>
                        name
                    </th>
                    <th>
                        date / time
                    </th>
                    <th>
                        order
                    </th>
                    <th>
                        delivery/pickup
                    </th>
                    <th>
                        cash/card
                    </th>
                    {props.type === OrderStateType.OPEN && <th>close</th>}
                </tr>
                </thead>
                <tbody>
                {orders && orders.map((order: OrderState) =>
                    <tr className={"orderBox"} key={order.id}>
                        <td> {order.id} </td>
                        <td><b>{order.address && order.address.name} </b></td>
                        <td>
                            {moment(order.date).format('HH:mm DD/MM/YYYY')}
                        </td>
                        <td>
                            <ProductListPanel orderItems={order.orderItems}/>
                            <b>TOTAL PRICE : {calculateTotal2(order.orderItems)} </b>
                        </td>
                        <td className={"deliveryType"}>
                            {order.deliveryType === DeliveryType.DELIVERY && <div className="icon-container">
                                <FontAwesomeIcon icon={faTruck} style={{
                                    fontSize: "14px",
                                    color: "navy",
                                    margin: "1px"
                                }}/> {order.deliveryType}
                            </div>}
                            {order.deliveryType === DeliveryType.PICKUP && <div className="icon-container">
                                <FontAwesomeIcon icon={faHandHolding} style={{
                                    fontSize: "14px",
                                    color: "pink",
                                    margin: "1px"
                                }}/> {order.deliveryType}
                            </div>}
                            <AddressPanel address={order.address}/>
                        </td>
                        <td className={"paymentType"}>
                            {order.paymentType === PaymentType.CASH && <div className="icon-container">
                                <FontAwesomeIcon icon={faMoneyBill} style={{
                                    fontSize: "14px",
                                    color: "green",
                                    margin: "1px"
                                }}/> {order.paymentType}
                            </div>}
                            {order.paymentType === PaymentType.CARD && <div className="icon-container">
                                <FontAwesomeIcon icon={faCreditCard} style={{
                                    fontSize: "14px",
                                    color: "black",
                                    margin: "1px"
                                }}/> {order.paymentType}
                                <CardPanel creditCard={order.creditCard}/>
                            </div>}
                        </td>
                        {props.type === OrderStateType.OPEN && <td>
                            <button>CLOSE</button>
                        </td>}
                    </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

function AddressPanel(props: {address: Address | undefined}) {

    if (!props.address)
        return (<div></div>)
    else
        return (
            <div>
                <table className={"contactTable"}>
                    <tbody>
                    <tr>
                        <td colSpan={2}>{props.address.name && <span>{props.address.name}</span>}</td>
                    </tr>
                    <tr>
                        <td>{props.address.street && <span>{props.address.street}</span>}</td>
                        <td>{props.address.postcode && <span>{props.address.postcode}</span>}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Tel : {props.address.telephone && <span>{props.address.telephone}</span>}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Email : {props.address.email && <span>{props.address.email}</span>}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
}

function CardPanel(props: any) {
    if (!props.creditCard)
        return <span>  </span>;

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>{props.creditCard.number && <span>{props.creditCard.number}</span>}</td>
                    <td>{props.creditCard.expDate && <span>{props.creditCard.expDate}</span>}</td>
                    <td>{props.creditCard.name && <span>{props.creditCard.name}</span>}</td>
                    <td>{props.creditCard.type && <span>{props.creditCard.type}</span>}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

function ProductListPanel(props: {orderItems: Array<{product: Product, amount?: number}>,}) {
    return (
        <table className={"productListTable"}>
            <thead key={"head"}>
            <tr key={"head-tr"}>
                <td  key={"i"}> </td>
                <td  key={"i"}>item</td>
                <td  key={"p"}>price</td>
                <td  key={"t"}>type</td>
                <td  key={"q"}>qty</td>
            </tr>
            </thead>
            <tbody>
            {props.orderItems && props.orderItems.map((item: any) =>
                <tr className={"orderItemBox"} key={item.id}>
                    <td key={item.id + "-0"}>
                        <img
                            width="40px"
                            src={Constants.baseURL + "images/" + Constants.company + "/" + item.product.imageFilename}>
                        </img>
                    </td>
                    <td key={item.id + "-1"}> {item.product.name} </td>
                    <td key={item.id + "-2"}> {item.product.price} </td>
                    <td key={item.id + "-3"}> {item.product.type} </td>
                    <td key={item.id + "-4"}> {item.amount} </td>
                </tr>
            )}
            </tbody>
        </table>)
}
