import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@mui/material";

import {useForm} from "react-hook-form";
import {Category} from "../../AppState";

type Props = {
    category: Category
    open: boolean
    type: "Create" | "Edit"
    value?: string
    handleCancel: () => void
    handleSubmit: (data:any) => void
}

//create/update
export default function CategoryDialog(props: Props) {

    const onSubmit = (categoryData: Category) => {
        props.handleSubmit(
            {...props.category, ...categoryData}
        )
    }

    const {register, handleSubmit, formState: {errors}} = useForm<Category>();

    return (
        <Dialog
            open={props.open}
            onClose={props.handleCancel}
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
                <Button onClick={props.handleCancel} variant={"outlined"}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
