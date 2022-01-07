import React from 'react';
import {ComponentMeta} from '@storybook/react';

import {ProductItem} from "../admin/products/ProductItem";
import imageFile from './assets/pizza.png';
import imageFileWide from './assets/pizza_wide.png';
import imageFileTall from './assets/pizza_high.png';
import ProductPanel from "../admin/products/ProductPanel";
import ShapeShopModal from "../admin/common/ShapeShopModal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {Box, Button} from "@mui/material";

export default {
    title: 'Product Item',
    component: ProductItem,
} as ComponentMeta<typeof ProductItem>;

export const Modal_Story = () => (
    <>
        <ShapeShopModal title={"Create Category!"}
                        description={"Do you want to add a category?"}
                        buttonIcon={AddCircleOutlineIcon}
                        buttonText={"Create Category"}
                        actions={[
                            {
                                onClick: () => alert("clicked"),
                                icon: AddCircleOutlineIcon,
                                text: "button"
                            }
                        ]}
        >
            <Box sx={{display: "flex", alignItems: "center", border: "2px dashed bold"}}>
                <Button>OK</Button>
                <Button>Cancel</Button>
            </Box>
        </ShapeShopModal>
    </>
);
