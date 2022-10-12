import {Actions} from './productActions';

import type {Category, Product, ProductsState} from "../../AppState";
import {extractUniqueCategories, getCategoryProducts} from "../../util/util";


const initialState: ProductsState = {
    categories: [],
    allProducts: [],
    productsError: "",
    updatingProduct: false,
};

export function productsReducer(state: ProductsState = initialState, action: any): ProductsState {

    console.info("in product reducer with action " + action.type)

    switch (action.type) {
        case Actions.ADD_PRODUCT:
            let newItems = state.allProducts;
            newItems.push(action.product);
            return {
                ...state,
                allProducts: newItems
                // updatingProduct: true
            };
        case Actions.DELETE_PRODUCT:
            return {
                ...state,
                allProducts: state.allProducts.filter((elem) => {
                    return elem.id !== action.product.id
                })
            };
        case Actions.UPDATE_PRODUCT:
            const i = state.allProducts.map((elem) => {
                if (elem.id === action.product.id)
                    return action.product;
                return elem;
            });
            return {
                ...state,
                allProducts: i
            };
        case Actions.FETCH_PRODUCTS:
            let productsAndCategories = getCategoryProducts(action.data)
            return {
                ...state,
                allProducts: action.data, //all products
                categoryProducts: productsAndCategories,
                categories: extractUniqueCategories(action.data)
            };
        case Actions.UPDATE_PRODUCT_SELECTION:
            return {
                ...state,
                allProducts: state.allProducts.map((item) => {
                    if (item.id === action.id) {
                        return {
                            ...item,
                            "quantity": action.value
                        }
                    }
                    return item;
                }),
            };
        default :
            return state;
    }
}



