import {Product} from "../AppState";

import "./shapeShopImage.scss"
import * as Constants from "../constants";
import * as React from "react";

type Props = {
    product: Product
}

// shape shop product image

export default function ShapeShopImage(props: Props) {
    return (
        <div className="shape-shop-image">
            <img height="250px"
                 src={Constants.baseURL + "images/" + Constants.company + "/" + props.product.imageFilename}
                 alt={props.product.imageFilename}
            />

            {props.product.sashText &&
                <h4 className="shape-shop-image-sash">{props.product.sashText}</h4>}
        </div>
    )
}
