import * as React from "react";
import type {Product} from "../AppState";
import {ProductItem} from "./ProductItem";
import {Button, Grid} from "@material-ui/core";

type Props = {
    products?: Array<Product>,
    category: string
}

export default function ProductPanel(props: Props) {
    return (
        <div>
            <div>Category Name : {props.category}
                <Button className="btn btn-1 btn-sep icon-info">delete</Button>
                <Button className="btn btn-2 btn-sep icon-cart">edit</Button>
            </div>
            {props.products &&
            <Grid container spacing={2}>
                {
                    props.products && props.products.map((product, i) =>
                        <Grid item xs={4} lg={2}>
                            <ProductItem key={i} item={product}/>
                        </Grid>
                        )
                }
            </Grid>
            }
        </div>
    )
}


