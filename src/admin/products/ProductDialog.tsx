import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, Grid, TextField} from "@mui/material";
import {Product} from "../../AppState";
import {useForm} from "react-hook-form";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    open: boolean
    type: "Create" | "Edit"
    handleCancel: () => any
    handleSubmit: (data:any) => any
    product?: Product
}

//create/update
export default function ProductDialog(props: Props) {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data:any) => {
        props.handleSubmit(data)
    }
    console.log("Errors " + errors);

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

                <form onSubmit={handleSubmit(onSubmit)}  id="myform2">
                    <Box m={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label={"name"}
                                    variant="outlined"
                                    fullWidth={true}
                                    // value={props.product.name}
                                    {...register("name", {required: true, maxLength: 5})}
                                    error={errors.name}
                                    helperText={errors.name?.type}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField multiline variant="outlined"
                                           fullWidth={true}
                                           maxRows={4} minRows={4}
                                           label={"description"}
                                           {...register("description", {required: true, maxLength: 80})}
                                           error={errors.description}
                                           helperText={errors.description?.type}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined"
                                           fullWidth={true}
                                           label={"price"}
                                           {...register("price", {required: true, maxLength: 5})}
                                           error={errors.price}
                                           helperText={errors.price?.type}
                                />
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
