import type {ProductsState} from "../../AppState";
import {extractUniqueCategories, getCategoryProducts} from "../../util/util";
import { AnyAction } from "redux";
import {createAction} from "@reduxjs/toolkit";
import {Product} from "../../AppState";

const initialState: ProductsState = {
    categories: [],
    allProducts: [],
    productsError: "xx",
    updatingProduct: false,
};

export const ProductActions = {
    UPDATE_PRODUCT_SELECTION: 'UPDATE_PRODUCT_SELECTION',
    FETCH_PRODUCTS: 'FETCH_PRODUCTS_SUCCESS',
    ADD_PRODUCT: 'ADD_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT_SUCCESS',
    DELETE_PRODUCT: 'DELETE_PRODUCT'
}

export const addProductAction = createAction<{ product: Product } >(ProductActions.ADD_PRODUCT);
export const deleteProductAction = createAction<{ product: Product } >(ProductActions.DELETE_PRODUCT);
export const updateProductSuccessAction = createAction<{ product: Product } >(ProductActions.UPDATE_PRODUCT);
export const fetchProductsSuccessAction = createAction<{ data: any }>(ProductActions.FETCH_PRODUCTS);
export const updateProductSelection = createAction<{ value: number, productid: string } >(ProductActions.UPDATE_PRODUCT_SELECTION);

//TODO this is how reducers are supposed to be written. Change other reducers to this, or
// maybe even go further with "createSlice" ? https://redux-toolkit.js.org/usage/usage-with-typescript
export function productsReducer(state: ProductsState = initialState, action: AnyAction): ProductsState {

    // console.info("action " + action + " " + state)

    if (addProductAction.match(action)) {
        // let newItems = state.allProducts;
        // newItems.push(action.payload.product);

        let allProds = [...state.allProducts, action.payload.product]

        let productsAndCategories = getCategoryProducts(allProds)

        return {
            ...state,
            allProducts: allProds,
            categoryProducts: productsAndCategories
        };
    }
    if (deleteProductAction.match(action)) {

        let ap = state.allProducts.filter((elem) => {
            return elem.id !== action.payload.product.id
        })

        let productsAndCategories = getCategoryProducts(ap)

        return {
            ...state,
            allProducts: ap,
            categoryProducts: productsAndCategories
        };
    }
    if (updateProductSuccessAction.match(action)) {

        const allProds = state.allProducts.map((elem) => {
            if (elem.id === action.payload.product.id)
                return action.payload.product;
            return elem;
        });

        let productsAndCategories = getCategoryProducts(allProds)

        return {
            ...state,
            allProducts: allProds,
            categoryProducts: productsAndCategories
        };
    }
    if (fetchProductsSuccessAction.match(action)) {
        let productsAndCategories = getCategoryProducts(action.payload.data)
        return {
            ...state,
            allProducts: action.payload.data, //all products..
            categoryProducts: productsAndCategories,
            categories: extractUniqueCategories(action.payload.data)
        };
    }
    if (updateProductSelection.match(action)) {

        let allProducts = state.allProducts.map((item): Product => {
            if (item.id === action.payload.productid) {
                return {
                    ...item,
                    amount: action.payload.value
                }
            }
            return item;
        })
        //recalculate PCs
        let productsAndCategories = getCategoryProducts(allProducts)
        return {
            ...state,
            allProducts: allProducts,
            categoryProducts: productsAndCategories
        };
    }
    return state;
}
