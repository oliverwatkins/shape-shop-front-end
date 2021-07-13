import * as React from "react";
import type {Product} from "../AppState";
import {ProductItem} from "./ProductItem";

type Props = {
    products: Product[],
    category: string
}

export default function ProductPanel(props: Props) {
    return (
        <div>
            <div>Category Name : {props.category}
                <button className="btn btn-1 btn-sep icon-info">delete</button>
                <button className="btn btn-2 btn-sep icon-cart">edit</button>
            </div>
            {props.products &&
                <div className={"admin-product-list"}>
                {
                    props.products && props.products.map((product, i) => <ProductItem key={i} item={product}/>)
                }
                </div>
            }
        </div>
    )
}


