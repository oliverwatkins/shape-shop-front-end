import * as React from "react";
import Button from "@material-ui/core/Button";
import {ProductItemEdit} from "./ProductItemEdit";
import {ErrorBoundary} from "../../misc/ErrorBoundary";
import {Product} from "../../AppState";
import * as Constants from "../../constants";
import {Box} from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {FileUploadModal} from "../FileUpload/FileUploadModal";

import "./productItem.scss";

type Props = { item: Product };

export function ProductItem(props: Props) {

    let product = props.item;

    const [editMode, setEditMode] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <Box className="admin-item-box">
            <ErrorBoundary>
                {showModal &&
                    <FileUploadModal onClose={() => setShowModal(false)} item={product} onClick={handleClose}/>
                }
                {editMode &&
                    <ProductItemEdit product={product} setEditMode={setEditMode}/>
                }
                {!editMode &&
                    <>
                        <Box className={"admin-item-edit-buttons"}>
                            <Button onClick={e => {
                                setShowModal(true);
                            }}>update image</Button>
                            <Button onClick={e => alert("TODO")}><DeleteIcon/></Button>
                            <Button onClick={e => {
                                setEditMode(true);
                            }}><EditIcon/></Button>
                        </Box>
                        <div className={"admin-item-box-image-box"}>
                            {product.image &&
                                // for storybook :
                                <img className={"admin-item-box-image"}
                                   src={product.image}
                                   alt={product.imageFilename}/>
                            }
                            {product.imageFilename &&
                                <img className={"admin-item-box-image"}
                                    src={Constants.baseURL + "images/" + Constants.company + "/" + product.imageFilename}
                                    alt={product.imageFilename}/>
                            }
                        </div>
                        <div className={"admin-item-box-desc "} title={product.name}>
                            {product.name}
                        </div>
                        <div className={"admin-item-box-price"}>
                            € {product.price}
                        </div>
                    </>
                }
            </ErrorBoundary>
        </Box>
    )
}