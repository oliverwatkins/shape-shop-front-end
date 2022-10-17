import * as React from 'react';
import type {Product} from "../AppState";
import {calculateTotal} from "./utils";
import {selectSelectedProducts} from "../selectors";
import {useSelector} from "react-redux";
import {getCategoryProducts} from "../util/util";

// type Props = {
//     selectedProducts?: Array<Product>,
// }

export default function OrderSummary() {

    let selectedProducts = useSelector(selectSelectedProducts);

    let splitIntoCategories: { [category: string]: Array<Product> } = {};
    if (selectedProducts && selectedProducts.length > 0) {
        splitIntoCategories = getCategoryProducts(selectedProducts);
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
                            <td>{product.amount && (product.amount > 1) ? product.amount : " "}</td>
                            <td>{priceTimesQty(product.price, product.amount)}</td>
                            </tr>
                    )});
                    return (
                        <>
                        <tr key={e}><td><h4>{e}</h4></td></tr>
                        {products}
                        </>
                    );
                })}
                <tr>
                    <td></td>
                    <td><b>Total:</b></td>
                    <td></td>
                    <td>{calculateTotal(selectedProducts)}</td>
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