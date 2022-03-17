import React from 'react';
import {ComponentMeta} from '@storybook/react';

import {ProductItem} from "../admin/products/ProductItem";
import imageFile from './assets/pizza.png';
import imageFileWide from './assets/pizza_wide.png';
import imageFileTall from './assets/pizza_high.png';

export default {
    title: 'Product Item',
    component: ProductItem,
} as ComponentMeta<typeof ProductItem>;

export const Simple_Product_Items = () => (
    <>
        <ProductItem item={{
            id: "1",
            name: "Pizza",
            price: 1.2,
            description: "This is the simple product description  blauh This is the simple product description  blauh This is the simple product description  blauh This is the simple product description  blauh This is the simple product description  blauh ",
            type: "main",
            image: imageFile,
            quantity: 1
        }} editProductCallback={() => 1} deleteProductCallback={() => 1} updateImageCallback={() => 1}/>
        <ProductItem item={{
            id: "2",
            name: "Pizza",
            description: "This is the simple product description. blah. This is the simple product description  blauh This is the simple product description  blauh This is the simple product description  blauh This is the simple product description  blauh ",
            type: "main",
            price: 1.2,
            image: imageFile,
            quantity: 1
        }} editProductCallback={() => 1} deleteProductCallback={() => 1} updateImageCallback={() => 1}/>
        <ProductItem item={{
            id: "3",
            name: "Pizza No desc",
            description: "",
            price: 1.2,
            type: "main",
            image: imageFile,
            quantity: 1
        }} editProductCallback={() => 1} deleteProductCallback={() => 1} updateImageCallback={() => 1}/>

        <ProductItem item={{
            id: "4",
            name: "Pizza Wide",
            description: "",
            price: 1.2,
            type: "main",
            image: imageFile,
            quantity: 1
        }} editProductCallback={() => 1} deleteProductCallback={() => 1} updateImageCallback={() => 1}/>

        <ProductItem item={{
            id: "5",
            name: "Pizza Tall",
            description: "",
            price: 1.2,
            type: "main",
            image: imageFile,
            quantity: 1
        }} editProductCallback={() => 1} deleteProductCallback={() => 1} updateImageCallback={() => 1}/>
    </>
);
