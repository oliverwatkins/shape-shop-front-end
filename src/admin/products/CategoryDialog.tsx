import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@mui/material";

import {useForm} from "react-hook-form";
import {AppState, Category, Product} from "../../AppState";
import {api, extractCategories} from "../../api/api";
import {Notify} from "../../notify";
import {addCategoryAction, addProductAction, updateCategorySuccessAction, updateProductSuccessAction} from "../redux/productsReducer";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

// type Props = {
//     category: Category
//     open: boolean
//     type: "Create" | "Edit"
//     value?: string
//     handleCancel: () => void
//     handleSubmit: (data:any) => void
// }


type Props = {
    open: boolean
    type: "Create" | "Edit"
    handleClose: () => void
    category?: Category
}

//create/update
export default function CategoryDialog(props: Props) {

    let loginToken = useSelector((state: AppState) => state.login.loginToken)
    const dispatch = useDispatch()
    let [loading, setLoading] = useState(true);


    const onSubmit = (categoryData: Category) => {

        // let cs = extractCategories(categoryData, categories);
        // categoryData.categories = cs;

        setLoading(true)
        if (props.type === "Create") {

            api.createCategory(categoryData, loginToken).then(() => {
                Notify.success("Created Category " + categoryData.name);

                dispatch(addCategoryAction({category: categoryData}))
            }).catch((error: { message: any; }) => {
                Notify.error(`onRejected function called: ${error.message}`);
                throw "this is an error"
            }).finally(() => {
                props.handleClose();
                setLoading(false)
            });
        } else {
            // categoryData.id = props?.product?.id as string;
            // categoryData.imageFilename = props?.product?.imageFilename;

            api.updateCategory(categoryData, loginToken).then(() => {
                Notify.success("Updated Category " + categoryData.name);
                dispatch(updateCategorySuccessAction({category: categoryData}))
            }).catch((error: { message: any; }) => {
                Notify.error(`onRejected function called: ${error.message}`);
            }).finally(() => {
                console.log('Experiment completed');
                props.handleClose();
                setLoading(false)
            });
        }
    }

    const {register, handleSubmit, formState: {errors}} = useForm<Category>();

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {(props.type === "Create") ? "Create Category!" : "Update Category!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {(props.type === "Create") ? "Do you want to add a category?" : "Do you want to update a category?"}
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)} id="categoryForm">
                    <TextField
                        label={"name"}
                        defaultValue={props.category?.name}
                        variant="outlined"
                        fullWidth={true}
                        {...register("name", {required: true, minLength: 5, maxLength: 35})}
                        // error={errors.name} TODO put back in
                        helperText={errors.name?.type}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button type="submit" form="categoryForm" variant={"contained"}>
                    {(props.type === "Create") ? "Submit" : "Update"}
                </Button>
                <Button onClick={props.handleClose} variant={"outlined"}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
