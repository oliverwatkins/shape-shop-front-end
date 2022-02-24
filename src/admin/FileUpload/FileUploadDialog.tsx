import * as React from "react";
import {AppState, Product} from "../../AppState";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {FileUploader} from "./FileUploader";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {api} from "../../api/api";
import {Notify} from "../../notify";
import {useSelector} from "react-redux";

type Props = {
    open: boolean
    // type: "Create" | "Edit" ???
    handleCancel: () => any
    handleSubmit: (data: any) => any
    product: Product
}


export function FileUploadDialog(props: Props) {

    const Authorization: any = useSelector((state: AppState)=>state.login.loginToken)
    const [selectedFile, setSelectedFile]  = React.useState({selectedFile: null});
    // On file upload (click the upload button)
    let onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        // @ts-ignore
        formData.append(
            "myFile",
            // @ts-ignore
            selectedFile.selectedFile,
            // @ts-ignore
            selectedFile.selectedFile.name
        );

        try {
            api.uploadImage(Authorization, selectedFile.selectedFile, props.product.id).catch((e: any) => {
                console.error(e)
                Notify.error("Error uploading image")
            });
        }catch(e){
            console.error(e)
        }
        // Details of the uploaded file
        console.log(selectedFile.selectedFile);
    };








    return <Dialog className={"file-upload-modal"}
                   open={props.open}
                   onClose={props.handleCancel}
                   aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Select an image file to upload
            </DialogContentText>
            <FileUploader item={props.product} setSelectedFile={setSelectedFile} selectedFile={selectedFile}/>
        </DialogContent>
        <DialogActions>
            {/*<Button onClick={props.onClick} color="primary">*/}
            {/*    Cancel*/}
            {/*</Button>*/}

            <Button onClick={props.handleCancel}>Cancel</Button>
            <Button onClick={props.handleSubmit}>Upload</Button>
            <Button onClick={onFileUpload} color="primary">
                Upload!
            </Button>
            {/*<Button type="submit" form="myform" color="primary">*/}
            {/*    Upload Image*/}
            {/*</Button>*/}
        </DialogActions>
    </Dialog>;
}