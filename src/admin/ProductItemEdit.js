import * as React from "react";
import {Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import type {AppState} from "../AppState";
import {createUpdateProduct} from "../order/redux/productActions";
import {LoadingView2} from "../misc/LoadingView";


export function ProductItemEdit(props) {

    let product = props.product;

    const dispatch = useDispatch();

    const Authorization: any = useSelector((state: AppState)=>state.login.loginToken)

    const updatingProduct: any = useSelector((state: AppState)=>state.products.updatingProduct)

    return (
        <LoadingView2 active={updatingProduct}>
            <div className={"item-edit-box"} >
                <Formik
                    initialValues={{name: product.name, price: product.price}}
                    validate={validator}
                    onSubmit={(values, blah) => {
                        dispatch(createUpdateProduct({...values, id: product.id}, Authorization));
                    }}>

                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                        <form onSubmit={handleSubmit} id="editProductForm">
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
                            <button type="button" onClick={()=>props.setEditMode(false)}>cancel</button>
                        </form>
                    )}
                </Formik>
            </div>
        </LoadingView2>
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