import React from 'react';
import { ComponentMeta } from '@storybook/react';

import {ProductItem} from "../admin/products/ProductItem";
import imageFile from './assets/pizza.png';
export default {
  title: 'Product Item',
  component: ProductItem,
} as ComponentMeta<typeof ProductItem>;

export const Simple_Product_Item = () => (
    <>
      <ProductItem item={{
        id: "1",
        name: "string",
        quantity: 1, //selected quantity
        price: 1.2,
        description: "string",
        type: "main",
        // imageFilename: pizza.png
        image: imageFile
      }} />
    </>
);
