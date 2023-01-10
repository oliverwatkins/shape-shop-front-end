/**
 * mock the fetch calls
 */
export function setupMockFetches(ok: boolean  = true) {

    // @ts-ignore
    window.fetch = jest.fn((url:string, init) => {
        if (url.endsWith("categories")) {
            return Promise.resolve({
                ok: ok,
                json: async () => (catlist_2cats),
            })
            // @ts-ignore
        } else if ((url.endsWith("products")) && (init.method === "GET")) {
            return Promise.resolve({
                ok: ok,
                json: async () => (productlist_2prods),
            })
            // @ts-ignore
        } else if ((url.endsWith("products")) && (init.method === "POST")) {
            return Promise.resolve({
                ok: ok,
                json: async () => ([{
                    "id": 34,
                    "company": {
                        "id": 1,
                        "name": "alpenhof"
                    },
                    "orders": [],
                    "productCategories": [],
                    "name": "third",
                    "description": "coming from mock",
                    "price": 12,
                    "imageFilename": "todo"
                }]),
            })
        }
    });
}


let catlist_2cats = [{
        "id": 0,
        "name": "main"
    }, {
        "id": 1,
        "name": "drinks"
    }
]

let productlist_2prods = [
    {
        "id": 1,
        "name": "first",
        "price": 2.1,
        "description": "my desc",
        "imageFilename": "img.jpg",
        "categories": [
            {
                "id": 0,
                "name": "main"
            }
        ]
    },
    {
        "id": 2,
        "name": "second",
        "price": 3.1,
        "description": "my desc 2",
        "imageFilename": "img2.jpg",
        "categories": [
            {
                "id": 1,
                "name": "drinks"
            }
        ]
    }
]
