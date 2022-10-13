import * as React from "react";
import {AppState, Authorization, Product} from "../../AppState";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {api} from "../../api/api";
import {Notify} from "../../notify";
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@material-ui/core";
import {Typography} from "@mui/material";
import {createUpdateProductSuccessAction} from "../redux/productsReducer";
// import {useDispatch, useSelector} from "react-redux";
type Props = {
    open: boolean
    handleCancel: () => any
    product: Product
}

export function FileUploadDialog(props: Props) {

    const dispatch = useDispatch();

    const auth: Authorization | undefined = useSelector((state: AppState) => state.login.loginToken);
    const [selectedFile, setSelectedFile]  = React.useState<any>({selectedFile: null});

    // On file select (from the pop up)
    let onFileChange = (event: any) => {
        // Update the state
        setSelectedFile({ selectedFile: event.target.files[0] })
    };
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
            api.uploadImage(auth, selectedFile.selectedFile, props.product.id).catch((e: any) => {
                console.error(e)
                Notify.error("Error uploading image")
            });

            let pp = props.product;

            pp.imageFilename = selectedFile.selectedFile.name

            dispatch(createUpdateProductSuccessAction({product: pp}))

            Notify.success("Saved Image ");

        }catch(e){

            Notify.error("Error uploading image " + e);
            console.error(e)
        }finally {
            props.handleCancel();
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
            <Box className={"file-upload-content"} style={{border: "0px blue dashed"}}>
                <Button
                    variant="contained"
                    component="label"
                >
                    Select File
                    <input
                        type="file"
                        hidden
                        onChange={onFileChange}
                    />
                </Button>

                {selectedFile.selectedFile ? <Box>
                    <Typography variant={"h5"}>File Details:</Typography>
                    <Typography>File Name: {selectedFile.selectedFile.name}</Typography>
                    <Typography>File Type: {selectedFile.selectedFile.type}</Typography>
                    <Typography>
                        Last Modified:{" "}
                        {selectedFile.selectedFile.lastModifiedDate.toDateString()}
                    </Typography>
                </Box> : <Box>
                    {/*Choose before Pressing the Upload button*/}
                </Box>}
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleCancel}>Cancel</Button>
            <Button onClick={onFileUpload} color="primary">Upload!</Button>
        </DialogActions>
    </Dialog>;
}