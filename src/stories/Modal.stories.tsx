import React from 'react';
import {ComponentMeta} from '@storybook/react';

import {ProductItem} from "../admin/products/ProductItem";
import OKCancelDialog from "../admin/common/OKCancelDialog";
import {Button} from "@mui/material";
import ProductDialog from "../admin/products/ProductDialog";
import imageFile from "./assets/pizza.png";

export default {
    title: 'Product Item',
    component: ProductItem,
} as ComponentMeta<typeof ProductItem>;

export const Modal_Story = () => (
    <>
        {/*<CreateCategoryModal callBack={(val: string) => {*/}
        {/*    alert("value = " + val)*/}
        {/*}} type={"Create"}/>*/}

        {/*<CreateCategoryModal callBack={(val: string) => {*/}
        {/*    alert("value = " + val)*/}
        {/*}} type={"Edit"} value={"my value to change"}/>*/}

        <Test/>
        <Test2/>
    </>
);

function Test2() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen}> Edit Product </Button>
            {open && <ProductDialog open={true}
                        product={{
                            id: "1",
                            name: "Pizza",
                            price: 1.2,
                            description: "This is the simple description ",
                            type: "main",
                            image: imageFile,
                            quantity: 1
                        }}
                         handleSubmit={(data) => {
                             alert("yeah " + data)
                             handleClose();

                         }}
                         handleCancel={() => {
                             handleClose();
                             // alert("nah")
                         }}
                        type={"Edit"}/>}
        </>
    )
}

function Test() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Button onClick={handleOpen}> Delete Category</Button>
            {open && <OKCancelDialog open={true} title={"Delete Thing!"}
                                     content={"Are you sure you want to delete thing?"}
                                     handleOK={() => {
                                         handleClose();
                                         alert("yeah")
                                     }}
                                     handleCancel={() => {
                                         handleClose();
                                         alert("cancel")
                                     }}/>}
        </>
    )
}
