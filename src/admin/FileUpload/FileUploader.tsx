// import axios from 'axios';

import React from 'react';
import {useSelector} from "react-redux";
import type {AppState, Product} from "../../AppState";
import {Button} from "@material-ui/core";
import {api} from "../../api/api";
import {Notify} from "../../notify";
import "./fileUpload.scss"


type Props = {
    item: Product,
    setSelectedFile: Function,
    selectedFile: any,

}

export function FileUploader(props: Props) {


    const Authorization: any = useSelector((state: AppState)=>state.login.loginToken)

    // const [selectedFile, setSelectedFile]  = React.useState({selectedFile: null});

    // On file select (from the pop up)
    let onFileChange = (event: any) => {
        // Update the state
        props.setSelectedFile({ selectedFile: event.target.files[0] })
    };

    // On file upload (click the upload button)
    // let onFileUpload = () => {
    //
    //     // Create an object of formData
    //     const formData = new FormData();
    //
    //     // Update the formData object
    //     // @ts-ignore
    //     formData.append(
    //         "myFile",
    //         // @ts-ignore
    //         selectedFile.selectedFile,
    //         // @ts-ignore
    //         selectedFile.selectedFile.name
    //     );
    //
    //     try {
    //         api.uploadImage(Authorization, selectedFile.selectedFile, props.item.id).catch((e: any) => {
    //             console.error(e)
    //             Notify.error("Error uploading image")
    //         });
    //     }catch(e){
    //         console.error(e)
    //     }
    //     // Details of the uploaded file
    //     console.log(selectedFile.selectedFile);
    // };

    return (
        <div className={"file-upload-content"} style={{border: "2px blue dashed"}}>
            <div>
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
                {/*<Button onClick={onFileUpload} color="primary">*/}
                {/*    Upload! old*/}
                {/*</Button>*/}
            </div>
            {fileData(props.selectedFile.selectedFile)}
        </div>
    );
}

// File content to be displayed after
// file upload is complete
let fileData = (selectedFile: any) => {

    if (selectedFile) {

        return (
            <div>
                <h2>File Detailsss:</h2>
                <p>File Name: {selectedFile.name}</p>
                <p>File Type: {selectedFile.type}</p>
                <p>
                    Last Modified:{" "}
                    {selectedFile.lastModifiedDate.toDateString()}
                </p>
            </div>
        );
    } else {
        return (
            <div>
                {/*Choose before Pressing the Upload button*/}
            </div>
        );
    }
};
