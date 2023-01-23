import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {Dialog} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

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
    title: string,
    content: string,
    handleOK: () => any,
    open: boolean
    handleCancel: () => any
}

export default function OKCancelDialog(props: Props) {
    return (
        <Dialog
            // sx={
            //     style
            // }
            open={props.open}
            onClose={props.handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleOK} variant={"contained"} >
                    OK
                </Button>
                <Button variant={"outlined"} onClick={props.handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
