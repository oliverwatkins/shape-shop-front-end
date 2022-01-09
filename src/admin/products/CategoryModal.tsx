import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
    type: "Create" | "Edit"
    value?: string
    callBack: Function
}

export default function CategoryModal(props: Props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [category, setCategory] = useState(props.value);

    const handleInput = (e: any) => setCategory(e.target.value);


    return (
        <div>
            <Button color="inherit" startIcon={<AddCircleOutlineIcon/>} onClick={handleOpen}>
                {props.type} Category</Button>
            <Dialog
                open={open}
                onClose={handleClose}
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
                        props.callBack((val: string) => alert(val));
                        handleClose();
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
                    <Button type="submit" form="myform" startIcon={<AddCircleOutlineIcon/>}
                    >
                        {(props.type === "Create") ? "Submit" : "Update"}
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
