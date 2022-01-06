import * as React from "react";
import type {Product} from "../../AppState";
import {ProductItem} from "./ProductItem";
// import {Box, Button, Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box, Grid} from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
// import "./productItem.scss";

type Props = {
    products?: Array<Product>,
    category: string
}

export default function ProductPanel(props: Props) {
    return (
        <div>



            {/*<Card>*/}
            {/*    <Box>*/}
            {/*        Category Name : {props.category}*/}
            {/*    </Box>*/}

            {/*    <Button className="btn btn-1 btn-sep icon-info">delete</Button>*/}
            {/*    <Button className="btn btn-2 btn-sep icon-cart">edit</Button>*/}
            {/*</Card>*/}

            <Box
                sx={{
                    // width: 300,
                    // height: 300,
                    backgroundColor: 'primary.white',

                    display: 'flex'

                    // color: 'primary.blue',
                    // '&:hover': {
                    //     backgroundColor: 'primary.main',
                    //     // opacity: [0.9, 0.8, 0.7],
                    // },
                }}
            >

                <Typography variant="h6" color='primary' sx={{ flexGrow: 1 }}>
                    Category : {props.category}
                </Typography>
                {/*sx={{ flexGrow: 1 }}*/}
                <Button onClick={e => alert("TODO")} ><DeleteIcon/> Delete Category</Button>
                <Button onClick={e => {
                    // setEditMode(true);
                }}><EditIcon/> Edit Category
                </Button>


            </Box>








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


