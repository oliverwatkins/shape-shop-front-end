

import {ByCategory, Product} from "../../../AppState";
import {getCategoryProducts} from "../../../util/util";

it("create category product tree", () => {
    let catProds: ByCategory = getCategoryProducts(allProducts);

    expect(catProds).toEqual(productsAndCategories);
});

let productsAndCategories: { [category: string]: Array<Product> } = {
    main: [
        {
            "id": "1",
            "name": "main1",
            "price": 1,
            "description": "main1 desc",
            "imageFilename": "main1.jpg",
        },
        {
            "id": "2",
            "name": "main2",
            "price": 2,
            "description": "main2 desc",
            "imageFilename": "main2.jpg",
        },
    ],
    drinks: [
        {
            "id": "3",
            "name": "drink1",
            "price": 3,
            "description": "drink1 desc",
            "imageFilename": "drink1.jpg",
        },
        {
            "id": "4",
            "name": "drink2",
            "price": 4,
            "description": "drink2 desc",
            "imageFilename": "drink2.jpg",
        }
    ]
}


let allProducts = [
    {
        "id": "1",
        "name": "main1",
        "price": 1,
        "description": "main1 desc",
        "imageFilename": "main1.jpg",
        "categories": [
            {
                "id": "1",
                "name": "main"
            }
        ]
    },
    {
        "id": "2",
        "name": "main2",
        "price": 2,
        "description": "main2 desc",
        "imageFilename": "main2.jpg",
        "categories": [
            {
                "id": "1",
                "name": "main"
            }
        ]
    },
    {
        "id": "3",
        "name": "drink1",
        "price": 3,
        "description": "drink1 desc",
        "imageFilename": "drink1.jpg",
        "categories": [
            {
                "id": "2",
                "name": "drinks"
            }
        ]
    },
    {
        "id": "4",
        "name": "drink2",
        "price": 4,
        "description": "drink2 desc",
        "imageFilename": "drink2.jpg",
        "categories": [
            {
                "id": "2",
                "name": "drinks"
            }
        ]
    }
]
