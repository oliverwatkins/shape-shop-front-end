import * as React from 'react';
import type {Product} from "../AppState";
import {calculateTotal} from "./utils";
import {selectOrder} from "../selectors";
import {useSelector} from "react-redux";
import {getCategoryProducts} from "../util/util";
import './orderSummary.scss';

/**
 * Right side summary shopping cart
 */
export default function OrderSummary() {

    let order = useSelector(selectOrder);
    return (
        <div className = {"order-summary"} data-testid = {"order-summary"}>
            <h3>Order Summary</h3>
            {getContent(order.selectedProducts)}
        </div>
    );
}

function getContent(selectedProducts: Product[]) {

    if (!selectedProducts || selectedProducts.length == 0)
        return (<div>Nothing selected</div>)

    let splitIntoCategories: { [category: string]: Array<Product> } = {};
    if (selectedProducts && selectedProducts.length > 0) {
        splitIntoCategories = getCategoryProducts(selectedProducts);
    }

    return (<table key={"wtfdf"}>
        <tbody key={"wtff"}>
        {splitIntoCategories && Object.keys(splitIntoCategories).map(categoryName => {

            let categoryProducts = splitIntoCategories[categoryName];

            let products = categoryProducts.map((product, i) => {
                return (<tr key={product.name}>
                        <td key={1}>{product.name}</td>
                        <td key={2} >{product.price}</td>
                        <td key={3} >{product.amount && (product.amount > 1) ? product.amount : " "}</td>
                        <td key={4} >{priceTimesQty(product.price, product.amount)}</td>
                    </tr>
                )});
            return (
                <>
                    <tr key={categoryName}><td><h4>{categoryName}</h4></td></tr>
                    {products}
                </>
            );
        })}
        <Summary selectedProducts={selectedProducts}/>
        </tbody>
    </table>)
}

function Summary(props: any) {
    return (
        <tr key={"summmarz"}>
            <td key={1} />
            <td key={2}><b>Total:</b></td>
            <td key={3}/>
            <td key={4}>{calculateTotal(props.selectedProducts)}</td>
        </tr>)
}

function priceTimesQty(price: number, qty?: number): string {
    if (qty) {
        let t: number = price * qty
        return t.toFixed(2);
    }
    return "" + price
}