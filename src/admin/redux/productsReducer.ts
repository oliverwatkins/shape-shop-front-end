import type {ProductsState} from "../../AppState";
import {extractUniqueCategories, getCategoryProducts} from "../../util/util";
import { AnyAction } from "redux";
import {createAction} from "@reduxjs/toolkit";
import {Product} from "../../AppState";

const initialState: ProductsState = {
    categories: [],
    allProducts: [],
    productsError: "",
    updatingProduct: false,
};

export const ProductActions = {
    UPDATE_PRODUCT_SELECTION: 'UPDATE_PRODUCT_SELECTION',
    FETCH_PRODUCTS: 'FETCH_PRODUCTS_SUCCESS',
    ADD_PRODUCT: 'ADD_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT_SUCCESS',
    DELETE_PRODUCT: 'DELETE_PRODUCT'
}

export const createAddProductAction = createAction<{ product: Product } >(ProductActions.ADD_PRODUCT);
export const createDeleteProductAction = createAction<{ product: Product } >(ProductActions.DELETE_PRODUCT);
export const createUpdateProductSuccessAction = createAction<{ product: Product } >(ProductActions.UPDATE_PRODUCT);
export const createFetchProductsSuccessAction = createAction<{ data: any }>(ProductActions.FETCH_PRODUCTS);
export const createUpdateProductSelection = createAction<{ value: number, productid: string } >(ProductActions.UPDATE_PRODUCT_SELECTION);

//TODO this is how reducers are supposed to be written. Change other reducers to this, or
// maybe even go further with "createSlice" ? https://redux-toolkit.js.org/usage/usage-with-typescript
export function productsReducer(state: ProductsState = initialState, action: AnyAction): ProductsState {
    if (createAddProductAction.match(action)) {
        let newItems = state.allProducts;
        newItems.push(action.payload.product);
        return {
            ...state,
            allProducts: newItems
            // updatingProduct: true
        };
    }
    if (createDeleteProductAction.match(action)) {
        return {
            ...state,
            allProducts: state.allProducts.filter((elem) => {
                return elem.id !== action.payload.product.id
            })
        };
    }
    if (createUpdateProductSuccessAction.match(action)) {
        const i = state.allProducts.map((elem) => {
            if (elem.id === action.payload.product.id)
                return action.payload.product;
            return elem;
        });
        return {
            ...state,
            allProducts: i
        };
    }
    if (createFetchProductsSuccessAction.match(action)) {
        let productsAndCategories = getCategoryProducts(action.payload.data)
        return {
            ...state,
            allProducts: action.payload.data, //all products
            categoryProducts: productsAndCategories,
            categories: extractUniqueCategories(action.payload.data)
        };
    }
    if (createUpdateProductSelection.match(action)) {

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
