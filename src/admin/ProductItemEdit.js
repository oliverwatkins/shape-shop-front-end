import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {FileUploader} from "./FileUploader";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import {createUpdateProduct} from "./redux/adminActions";


export function ProductItemEdit(props) {

    let product = props.product;

    const dispatch = useDispatch();

    return (
        <div className={"item-edit-box"} >

            <Formik
                initialValues={{name: product.name, price: product.price}}
                validate={validator}
                onSubmit={(values, blah) => {

                    dispatch(createUpdateProduct({...values, id: product.id}));


                    // setTimeout(() => {
                    //     blah.setSubmitting(false);
                    //     props.updateAddress(values);
                    //     setRedirect(true)
                    // }, 400);
                }}>

                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <form onSubmit={handleSubmit} id="addressForm">
                        <img className={"item-box-image"} src={"http://localhost:8080/images/" + product.imageFilename}
                             alt={product.imageFilename}/>
                        <div className={"item-box-desc "} title={product.name}>
                            <label htmlFor="name">Name :</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name} />
                            <div className={"error"}>
								{errors.name && touched.name && errors.name}
								</div>

                        </div>
                        <div className={"item-box-bottom"}>
                            <div className={"item-box-price"}>
                                <label htmlFor="price">Price :</label>
                                <input
                                type={"text"}
                                id="price"
                                name="price"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price} />
                            </div>
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            save
                        </button>
                        <button type="button">cancel</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

let validator = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Name Required';
    }

    if (!values.price) {
        errors.price = 'Name Required';
    }

    return errors;
}