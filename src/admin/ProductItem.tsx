import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {FileUploader} from "./FileUpload/FileUploader";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {ProductItemEdit} from "./ProductItemEdit";
import {ErrorBoundary} from "../misc/ErrorBoundary";
import {Product} from "../AppState";
import * as Constants from "../constants";
import {Box} from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {FileUploadModal} from "./FileUpload/FileUploadModal";

type Props = {item: Product};



const classes = {
    paper: {
        backgroundColor: "#eee",
        marginLeft: "30%",
        marginRight: "30%"
    },
    textField: {
        backgroundColor: "#fff"
    },
    button: {
        backgroundColor: "green",
        marginLeft: 20
    }
};

// class NewComponent extends React.Component<{ onClose: () => void, item: Product, onClick: () => void }> {
//     render() {
//         return <Dialog open={true} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
//             <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
//             <DialogContent>
//                 <DialogContentText>
//                     Select an image file to upload
//                 </DialogContentText>
//                 <FileUploader item={this.props.item}/>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={this.props.onClick} color="primary">
//                     Cancel
//                 </Button>
//                 {/*<Button type="submit" form="myform" color="primary">*/}
//                 {/*    Upload Image*/}
//                 {/*</Button>*/}
//             </DialogActions>
//         </Dialog>;
//     }
// }

export function ProductItem(props: Props) {

    let product = props.item;

    const [editMode, setEditMode]  = React.useState(false);
    const [showModal, setShowModal]  = React.useState(false);

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <Box className="product-item">
            <ErrorBoundary>
            {showModal &&
            <FileUploadModal onClose={() => setShowModal(false)} item={product} onClick={handleClose}/>
            }
            {editMode &&
                 <ProductItemEdit product={product} setEditMode={setEditMode}/>
            }
            {!editMode &&
                <>
                    <Box sx={{border: "2px dashed red", width:"200px", height:"200px"}}>
                        <img className={"item-box-image"}
                             style={{maxWidth:"100%", maxHeight: "100%"}}
                             src={Constants.baseURL + "images/" + Constants.company + "/" + product.imageFilename}
                             alt={product.imageFilename}/>
                    </Box>

                    <div className={"item-box-desc "} title={product.name}>
                    {product.name}
                    </div>
                    <div className={"item-box-bottom"}>
                        <div className={"item-box-price"}>
                        € {product.price}
                        </div>
                    </div>
                    <Button onClick={e => {
                        setShowModal(true);
                    }}>update image</Button>
                    <Button onClick={e => alert("TODO")}><DeleteIcon/></Button>
                    <Button onClick={e => {
                        setEditMode(true);
                    }}><EditIcon/></Button>
                </>
            }
            </ErrorBoundary>
        </Box>
    )
}