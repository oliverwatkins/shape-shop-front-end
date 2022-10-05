

import {getCats} from "../productsReducer";
import {ByCategory, Product} from "../../../AppState";



it("renders without crashing", () => {
    let x: ByCategory = getCats(allProducts);

    expect(x).toEqual(productsAndCategories);
});

let productsAndCategories = {
    main: [
        {
            "id": 1,
            "name": "main1",
            "price": 1,
            "description": "main1 desc",
            "imageFilename": "main1.jpg",
        },
        {
            "id": 2,
            "name": "main2",
            "price": 2,
            "description": "main2 desc",
            "imageFilename": "main2.jpg",
        },
    ],
    drinks: [
        {
            "id": 3,
            "name": "drink1",
            "price": 3,
            "description": "drink1 desc",
            "imageFilename": "drink1.jpg",
        },
        {
            "id": 4,
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



export type Country = {
    name:string,
    language:string,
    continent?:string
}

let allCountries: Array<Country> = [
    {
        "name": "Japan",
        "language": "Japanese",
        "continent": "Asia"
    },
    {
        "name": "Netherlands",
        "language": "Dutch",
        "continent": "Europe"
    },
    {
        "name": "Germany",
        "language": "German",
        "continent": "Europe"
    }
]


type ByContinent = { [continents: string]: Array<Country> };

let byContinent: ByContinent  = {

    asia: [
        {
            "name": "Japan",
            "language": "Japanese",
            "continent": "Asia"
        },
    ],
    europe: [
        {
            "name": "Netherlands",
            "language": "Dutch",
            "continent": "Europe"
        },
        {
            "name": "Germany",
            "language": "German",
            "continent": "Europe"
        }
    ]
}


