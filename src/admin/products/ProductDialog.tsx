import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, Grid, MenuItem, Select, Tab, TextField} from "@mui/material";
import {AppState, Category, Product} from "../../AppState";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../api/api";
import {createUpdateProductSuccessAction} from "../redux/productsReducer";
import {Notify} from "../../notify";
import {useAsync} from "react-async-hook";

type Props = {
    open: boolean
    type: "Create" | "Edit"
    handleCancel: () => void
    // handleSubmit: (data: any) => void
    product?: Product
}
// TODO comment back in errors
//create/update
export default function ProductDialog(props: Props) {

    const categories = useSelector((state: AppState) => state.products.categories)
    let loginToken = useSelector((state: AppState) => state.login.loginToken)
    const dispatch = useDispatch()
    // const {
    //     loading: productLoading,
    //     error: productError,
    //     result: products = null,
    // } = useAsync<Product[]>(api.updateProduct, []);



//
//     let editProductCallback = async (item: Product) => {
//         try {
//             await api.updateProduct(item, Authorization)
//
//             //after update in backend, update the state from this component
//             dispatch(createUpdateProductSuccessAction({product: item}))
//
//             setOpenEditPProduct(false);
//
//             Notify.success("Edited Product " + item.name);
//         } catch (e) {
//             console.error(e)
//
//             // dispatch(createUpdateProductAction({product: item})) //TODO fail action?
// //TODO this will not catch errors here. Use useAsync (See OrderPanel)
//             setOpenEditPProduct(false);
//             Notify.error("Error editing product");
//         }
//     }







    const {register, handleSubmit, formState: {errors}} = useForm<Product>();
    const onSubmit = (productData: Product) => {


        // alert()
        // props.handleSubmit(
        //     {...props.product, ...productData}
        // )

        // const {
        //     loading: productLoading,
        //     error: productError,
        //     result: products = null,
        // } = useAsync<Product[]>(api.updateProduct, [productData, loginToken]);
        api.createProduct(productData, loginToken);

        // api.createProduct(productData, loginToken).then((e:any) =>
        //     alert("then")
        // ).catch((e:any) => {
        //     console.error(e)
        //     alert("catch")
        //     }
        //     // alert("catch")
        // )

        dispatch(createUpdateProductSuccessAction({product: productData}))

        // setOpenEditPProduct(false); TODO

        Notify.success("Edited Product " + productData.name);

    }
    return (
        <Dialog
            open={props.open}
            onClose={props.handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
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
                                <Select variant="outlined"
                                        multiline={true}
                                           defaultValue={props.product?.price}
                                           fullWidth={true}
                                           label={"XXXX"}
                                           {...register("categories", {required: true, maxLength: 5})}
                                    // error={errors.price}
                                    //        helperText={errors.price?.type}
                                >
                                        {/*<MenuItem value={10}>Ten</MenuItem>*/}
                                        {/*    /!*<Checkbox checked={personName.indexOf(name) > -1} />*!/*/}
                                        {/*    /!*<ListItemText primary={name} />*!/*/}
                                        {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                                        {/*<MenuItem value={30}>Thirty</MenuItem>*/}

                                    {categories.map((category: Category, i:number) =>
                                        <MenuItem key={category.name} value={category.name}>
                                            {category.name}
                                        </MenuItem>
                                    )}



                            {/*</Grid>*/}

                            {/*TODO category drop down here??*/}
                            {/*<input type="hidden" {...register("type")} defaultValue={"main"}/>*/}
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
                <Button onClick={props.handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
