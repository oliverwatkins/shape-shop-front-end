import * as React from "react";
import type {Product} from "../AppState";

type Props = {
    products: Product[],
    category: string
}

export default function ProductPanel(props: Props) {
    return (
        <div>
            <div>Category Name : {props.category}</div>
            {props.products &&
                <div className={"product-list"}>
                {
                    props.products && props.products.map(product => <ProductItem item={product}/>)
                }
                </div>
            }
        </div>
    )
}


function ProductItem(props) {

    let product = props.item;

    return (
        <div className={"item-box"} >
            <img className={"item-box-image"} src={"http://localhost:8080/images/" + product.imageFilename}
                 alt={product.imageFilename}/>
            <div className={"item-box-desc "} title={product.name}>
                {product.name}
            </div>
            <div className={"item-box-bottom"}>
                <div className={"item-box-price"}>
                    € {product.price}
                </div>
            </div>
        </div>
    )
}
