import * as React from 'react';
import type {Product} from "../AppState";
import {calculateTotal} from "./utils";
import {AppState} from "../AppState";
import {selectSelectedProducts} from "../selectors";
import {connect} from "react-redux";
import {getCategoryProducts} from "../util/util";

type Props = {
    selectedProducts?: Array<Product>,
}

export function OrderSummary(props: Props) {

    let splitIntoCategories: { [category: string]: Array<Product> } = {};
    if (props.selectedProducts && props.selectedProducts.length > 0) {
        splitIntoCategories = getCategoryProducts(props.selectedProducts);
    }


    return (
        <div className={"order-summary"}>
            <table>
                <tbody>

                {splitIntoCategories && Object.keys(splitIntoCategories).map(e => {

                    let categoryProducts = splitIntoCategories[e];

                    let products = categoryProducts.map(product => {
                        return (<tr key={product.name}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity && (product.quantity > 1) ? product.quantity : " "}</td>
                            <td>{priceTimesQty(product.price, product.quantity)}</td>
                            </tr>
                    )});

                    return (
                        <>
                        <tr><td><h4>{e}</h4></td></tr>
                        {products}
                        </>
                    );
                })}
                {/*{props.selectedProducts && props.selectedProducts.length > 0 &&*/}
                {/*    <tr>*/}
                {/*        <td><h4>Mains?</h4></td>*/}
                {/*        <td/>*/}
                {/*        <td/>*/}
                {/*        <td/>*/}
                {/*    </tr>*/}
                {/*}*/}
                {/*{*/}
                {/*    props.selectedProducts && props.selectedProducts.map((elem: Product) => {*/}
                {/*        return <tr key={elem.name}>*/}
                {/*            <td>{elem.name}</td>*/}
                {/*            <td>{elem.price}</td>*/}
                {/*            <td>{elem.quantity && (elem.quantity > 1) ? elem.quantity : " "}</td>*/}
                {/*            <td>{priceTimesQty(elem.price, elem.quantity)}</td>*/}
                {/*        </tr>*/}
                {/*    })*/}
                {/*}*/}
                <tr>
                    <td></td>
                    <td><b>Total:</b></td>
                    <td></td>
                    {/*<td>{calculateTotal(props.selectedProducts, props.selectedProducts2)}</td>*/}
                    <td>{calculateTotal(props.selectedProducts)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

function priceTimesQty(price: number, qty?: number): string {
    if (qty) {
        let t: number = price * qty
        return t.toFixed(2);
    }
    return "" + price
}

// export default OrderSummary;
const mapStateToProps = (state: AppState) => {
    return {
        selectedProducts: selectSelectedProducts(state),
    };
};

export default connect(
    mapStateToProps,
    null,
)(OrderSummary);