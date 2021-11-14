// import axios from 'axios';

import React, {SyntheticEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "./redux/adminActions";
import type {AppState, OrderState, Product} from "../AppState";


export function FileUploader() {


    const Authorization: any = useSelector((state: AppState)=>state.login.loginToken)

    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile]  = React.useState({selectedFile: null});

    // On file select (from the pop up)
    let onFileChange = (event: any) => {

        // Update the state

        setSelectedFile({ selectedFile: event.target.files[0] })

        // this.setState({ selectedFile: event.target.files[0] });

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

        // Details of the uploaded file
        console.log(selectedFile.selectedFile);

        dispatch({ type: Actions.UPLOAD_IMAGE, formData: formData, Authorization: Authorization })
        // Request made to the backend api
        // Send formData object
        // axios.post("api/uploadfile", formData);
    };

    return (
        <div>

            <form method="POST" encType="multipart/form-data" action="/">
                <table>
                    <tr>
                        <td>File to upload2 :</td>
                        <td><input type="file" name="file"/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="submit" value="Upload"/></td>
                    </tr>
                </table>
            </form>

            <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>
                    Upload!
                </button>
            </div>
            {fileData(selectedFile.selectedFile)}
        </div>
    );
}

// File content to be displayed after
// file upload is complete
let fileData = (selectedFile) => {

    if (selectedFile) {

        return (
            <div>
                <h2>File Details:</h2>
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
                <br />
                <h4>Choose before Pressing the Upload button</h4>
            </div>
        );
    }
};
