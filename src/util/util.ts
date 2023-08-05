import {Category, Product} from "../AppState";

/**
 * transform products array into an object with keys that are the category. Each category has an
 * array of products
 *
 * TODO memoise
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
        catProds[uniqueCategory.name] = filtered;
    }
    return catProds;
}

/**
 * pull out unique categories from products
 */
export function extractUniqueCategories(productsArray: Array<Product>) {
    let uniqueCategories: Array<Category> = [];

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