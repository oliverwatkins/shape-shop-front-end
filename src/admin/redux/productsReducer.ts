import {Actions} from './productActions';

import type {Category, Product, ProductsState} from "../../AppState";


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


/**
 * transform products array into an object with keys that are the category. Each category has an
 * array of products
 */
export function getCategoryProducts(productsArray: Array<Product>): { [category: string]: Array<Product> } {

    let catProds: { [category: string]: Array<Product> } = {}

    let uniqueCategories = extractUniqueCategories(productsArray);

    for (const uniqueCategory of uniqueCategories) {

        let filtered = productsArray.filter(p => {
            let cats: Array<Category> | undefined = p.categories;
            if (cats)
                for (const cat of cats) {
                    if (cat.name === uniqueCategory.name) {
                        return true;
                    }
                }
            return false;
        })

        let stripOutCats = (el: Product) => {
            //strip out categories, qty,
            return {
                id: el.id,
                name: el.name,
                price: el.price,
                imageFilename: el.imageFilename,
                description: el.description
            }
        }
        filtered = filtered.map(stripOutCats);
        catProds[uniqueCategory.name] = filtered;
    }
    return catProds;
}


function extractUniqueCategories(productsArray: Array<Product>) {
    let uniqueCategories: Array<Category> = [];

    // extract categories
    for (const product of productsArray) {

        let categories: Array<Category> | undefined = product.categories;
        if (categories)
            for (const cat of categories) {
                let foundCat = uniqueCategories.find(el => el.name === cat.name)
                if (!foundCat)
                    uniqueCategories.push(cat)
            }
    }
    return uniqueCategories;
}

