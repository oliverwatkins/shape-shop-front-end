import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import EditIcon from '@mui/icons-material/Edit';

import {SyntheticEvent, useState} from "react";

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
    value?: string
    handleCancel: () => any
    handleSubmit: (data:any) => any
}

//create/update
export default function CategoryDialog(props: Props) {

    const [category, setCategory] = useState(props.value);
    const handleInput = (e: any) => setCategory(e.target.value);
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
                <form id="myform" onSubmit={(e: any) => //FormEvent<HTMLFormElement>) => //TODO what should this type be??
                {
                    e.preventDefault();
                    console.log(e.target && e.target.length ? e.target[0].value : "nuttin here..")
                    props.handleSubmit((val: string) => alert(val));
                    props.handleCancel();
                }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="categoryName"
                        name="categoryName"
                        label="Category Name"
                        type="category"
                        value={category}
                        onChange={(e) => handleInput(e)}
                        fullWidth
                        variant="standard"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button type="submit" form="myform" variant={"contained"}>
                    {(props.type === "Create") ? "Submit" : "Update"}
                </Button>
                <Button onClick={props.handleCancel} variant={"outlined"}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
