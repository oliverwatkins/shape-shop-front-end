import * as React from "react";
import type {Product} from "../AppState";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";

type Props = {
    products: Product[],
    category: string
}

export default function ProductPanel(props: Props) {
    return (
        <div>
            <div>Category Name : {props.category}

                <button className="btn btn-1 btn-sep icon-info">delete</button>
                <button className="btn btn-2 btn-sep icon-cart">edit</button>

            {/*<button className={"btn"}>delete</button>*/}
            {/*<button className={"btn"}>edit</button>*/}
            </div>
            {props.products &&
                <div className={"admin-product-list"}>
                {
                    props.products && props.products.map(product => <ProductItem item={product}/>)
                }
                </div>
            }
        </div>
    )
}

function ProductItem(props) {

    let product = props.item;

    const [showModal, setShowModal]  = React.useState(false);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        // alert(JSON.stringify(e))

        handleClose()
    }

    return (
        <div className={"item-box"} >
            {showModal &&
            <Dialog open={true} onClose={() => setShowModal(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select an image file to upload
                    </DialogContentText>

                    <form onSubmit={handleSubmit} id="myform">
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                hidden
                            />
                        </Button>
                        <input
                            accept="image/*"
                            // className={classes.input}
                            style={{ display: 'none' }}
                            id="raisesd-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span" >
                                {/*// className={classes.button}>*/}
                                Upload
                            </Button>
                        </label>
                    </form>



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
            <img className={"item-box-image"} src={"http://localhost:8080/images/" + product.imageFilename}
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
            <button>edit</button>
        </div>
    )
}
