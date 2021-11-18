import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {FileUploader} from "./FileUploader";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {ProductItemEdit} from "./ProductItemEdit";
import {ErrorBoundary} from "../misc/ErrorBoundary";
import {Product} from "../AppState";
import * as Constants from "../constants";

type Props = {item: Product};

export function ProductItem(props: Props) {

    let product = props.item;

    const [editMode, setEditMode]  = React.useState(false);
    const [showModal, setShowModal]  = React.useState(false);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        // console.info("e.target.file " + e.target.file)
        handleClose();
    }

    return (
        <div>
            <ErrorBoundary>
            {showModal &&
            <Dialog open={true} onClose={() => setShowModal(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select an image file to upload
                    </DialogContentText>
                    <FileUploader item={product}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" form="myform" color="primary">
                        Upload Image
                    </Button>
                </DialogActions>
            </Dialog>
            }
            {editMode &&
                 <ProductItemEdit product={product} setEditMode={setEditMode}/>
            }
            {!editMode &&
             <div className={"item-box"} >
                <img className={"item-box-image"}
                     src={Constants.baseURL + Constants.company + "/images/" + product.imageFilename}
                     alt={product.imageFilename}/>

                <button onClick={e => {
                    setShowModal(true);
                }}>update image</button>
                <div className={"item-box-desc "} title={product.name}>
                {product.name}
                </div>
                <div className={"item-box-bottom"}>
                    <div className={"item-box-price"}>
                    € {product.price}
                    </div>
                </div>
                <button>delete</button>
                <button onClick={e => {
                    setEditMode(true);
                }}>edit</button>
             </div>
            }
            </ErrorBoundary>
        </div>
    )
}