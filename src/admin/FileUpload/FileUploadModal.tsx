import * as React from "react";
import {Product} from "../../AppState";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {FileUploader} from "./FileUploader";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export function FileUploadModal(props: { onClose: () => void, item: Product, onClick: () => void }) {
    return <Dialog className={"file-upload-modal"}
                   open={true}
                   onClose={props.onClose}
                   aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Select an image file to upload
            </DialogContentText>
            <FileUploader item={props.item}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClick} color="primary">
                Cancel
            </Button>
            {/*<Button type="submit" form="myform" color="primary">*/}
            {/*    Upload Image*/}
            {/*</Button>*/}
        </DialogActions>
    </Dialog>;
}