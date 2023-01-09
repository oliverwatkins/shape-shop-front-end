import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, CircularProgress, Grid, InputLabel, MenuItem, Select, Tab, TextField} from "@mui/material";
import {AppState, Category, Product} from "../../AppState";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {api, extractCategories} from "../../api/api";
import {addProductAction, updateProductSuccessAction} from "../redux/productsReducer";
import {Notify} from "../../notify";
import {useAsync} from "react-async-hook";
import {screen} from "@testing-library/react";
import {useState} from "react";

type Props = {
    open: boolean
    type: "Create" | "Edit"
    handleClose: () => void
    product?: Product
}
// TODO comment back in errors
//create/update
export default function ProductDialog(props: Props) {

    const categories = useSelector((state: AppState) => state.products.categories)
    let loginToken = useSelector((state: AppState) => state.login.loginToken)
    const dispatch = useDispatch()
    let [loading, setLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<Product>();
    const onSubmit = (productData: Product) => {
        setLoading(true)
        let cs = extractCategories(productData, categories);
        productData.categories = cs;

        if (props.type === "Create") {

            api.createProduct(productData, loginToken).then(() => {
                    Notify.success("Created Product " + productData.name);
                    dispatch(addProductAction({product: productData}))
                }).catch((error: { message: any; }) => {
                    Notify.error(`onRejected function called: ${error.message}`);
                    throw "this is an error"
                }).finally(() => {
                    setLoading(false)
                    props.handleClose();
            });
        } else {
            productData.id = props?.product?.id as string;
            productData.imageFilename = props?.product?.imageFilename;

            api.updateProduct(productData, loginToken).then(() => {
                Notify.success("Updated Product " + productData.name);
                dispatch(updateProductSuccessAction({product: productData}))
            }).catch((error: { message: any; }) => {
                Notify.error(`onRejected function called: ${error.message}`);
            }).finally(() => {
                console.log('Experiment completed');
                setLoading(false)
                props.handleClose();
            });
        }
    }
    // @ts-ignore
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {loading && <CircularProgress color="primary"/>}
            <DialogTitle id="alert-dialog-title">
                {(props.type === "Create") ? "Create Product!" : "Update Product!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {(props.type === "Create") ? "Create Product" : "Edit Product"}
                </DialogContentText>

                <form onSubmit={handleSubmit(onSubmit)} id="myform2">
                    <Box m={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label={"name"}
                                    defaultValue={props.product?.name}
                                    variant="outlined"
                                    fullWidth={true}
                                    {...register("name", {required: true, maxLength: 35})}
                                    // error={errors.name}
                                    helperText={errors.name?.type}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField multiline variant="outlined"
                                           defaultValue={props.product?.description}
                                           fullWidth={true}
                                           maxRows={4} minRows={4}
                                           label={"description"}
                                           {...register("description", {required: true, maxLength: 120})}
                                           // error={errors.description}
                                           helperText={errors.description?.type}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined"
                                           defaultValue={props.product?.price}
                                           fullWidth={true}
                                           label={"price"}
                                           {...register("price", {required: true, maxLength: 5})}
                                           // error={errors.price}
                                           helperText={errors.price?.type}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>category</InputLabel>
                                <Select variant="outlined"
                                        multiline={true}
                                        defaultValue={"main"}
                                        fullWidth={true}
                                        {...register("categoriesForForm", {required: true, maxLength: 5})}
                                >
                                    {categories.map((category: Category, i:number) =>
                                        // @ts-ignore
                                        <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
                                    )}
                                </Select>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </DialogContent>
            <DialogActions>
                <Button type="submit" form="myform2"
                        disabled={Object.keys(errors).length !== 0}
                        variant="contained"
                >
                    {(props.type === "Create") ? "Submit" : "Update"}
                </Button>
                <Button onClick={props.handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

