import * as React from "react";
import type {Product} from "../../AppState";
import {ProductItem} from "./ProductItem";
// import {Box, Button, Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
// import "./productItem.scss";

type Props = {
    products?: Array<Product>,
    category: string
}

export default function ProductPanel(props: Props) {
    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        benel=volent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
            {/*<Card>*/}
            {/*    <Box>*/}
            {/*        Category Name : {props.category}*/}
            {/*    </Box>*/}

            {/*    <Button className="btn btn-1 btn-sep icon-info">delete</Button>*/}
            {/*    <Button className="btn btn-2 btn-sep icon-cart">edit</Button>*/}
            {/*</Card>*/}










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


