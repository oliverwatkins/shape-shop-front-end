import * as React from "react";
import Button from "@material-ui/core/Button";
import {ProductItemEdit} from "./ProductItemEdit";
import {ErrorBoundary} from "../../misc/ErrorBoundary";
import {Product} from "../../AppState";
import * as Constants from "../../constants";
import {Box, Grid, TextField} from "@material-ui/core";

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

                            <Button onClick={e => alert("TODO")}><DeleteIcon/></Button>
                            <Button onClick={e => {
                                setEditMode(true);
                            }}><EditIcon/></Button>
                        </Box>
                        <Box className={"admin-item-box-image-box"}>

                            <Box className={"admin-item-update-image-button-box"}>
                                <Button
                                    className={"admin-item-update-image-button"}
                                    onClick={e => {
                                        setShowModal(true);
                                    }}>update image</Button>
                            </Box>

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
                        </Box>

                        {getProductFields(product)}
                    </>
                }
            </ErrorBoundary>
        </Box>
    )
}

function getProductFields(product: Product) {
    return <Box m={1}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    // size=medium
                    // InputLabelProps={{style: {fontFamily: 'Arial', fontSize: 16}}}
                    // inputProps={{style: {fontFamily: 'Arial', fontSize: 18}}}
                    label={"name"}
                    variant="outlined"
                    fullWidth={true}
                    value={product.name}/>
            </Grid>

            <Grid item xs={12}>
                <TextField multiline variant="outlined" fullWidth={true}

                           // InputLabelProps={{style: {fontFamily: 'Arial', fontSize: 16}}}
                           // inputProps={{style: {fontFamily: 'Arial', fontSize: 18}}}

                           maxRows={4} minRows={4}
                           label={"description"} value={product.description}/>

            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined"
                           fullWidth={true}

                           // InputLabelProps={{style: {fontFamily: 'Arial', fontSize: 16}}}
                           // inputProps={{style: {fontFamily: 'Arial', fontSize: 18}}}

                           label={"price"}
                           value={"€ " + product.price}/>
            </Grid>
        </Grid>
    </Box>;
}