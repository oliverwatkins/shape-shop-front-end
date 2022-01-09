import React from 'react';
import {ComponentMeta} from '@storybook/react';

import {ProductItem} from "../admin/products/ProductItem";
import CreateCategoryModal from "../admin/products/CategoryModal";
import OKCancelDialog from "../admin/products/OKCancelDialog";
import {Button} from "@mui/material";

export default {
    title: 'Product Item',
    component: ProductItem,
} as ComponentMeta<typeof ProductItem>;

export const Modal_Story = () => (
    <>
        <CreateCategoryModal callBack={(val: string) => {
            alert("value = " + val)
        }} type={"Create"}/>

        <CreateCategoryModal callBack={(val: string) => {
            alert("value = " + val)
        }} type={"Edit"} value={"my value to change"}/>

        <Test/>
    </>
);

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
