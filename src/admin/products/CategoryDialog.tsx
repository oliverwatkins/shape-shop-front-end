import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@mui/material";

import {useForm} from "react-hook-form";
import {AppState, Category} from "../../AppState";
import {api} from "../../api/api";
import {Notify} from "../../notify";
import {addCategoryAction, updateCategorySuccessAction} from "../redux/productsReducer";
import {useDispatch, useSelector} from "react-redux";

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

            categoryData.id = props?.category?.id as string;
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
                    {(props.type === "Create") ? "Enter a category name" : "Enter new name for category"}
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)} id="categoryForm">
                    <TextField
                        label={"name"}
                        defaultValue={props.category?.name}
                        variant="outlined"
                        fullWidth={true}
                        {...register("name", {required: true, minLength: 5, maxLength: 55})}
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
