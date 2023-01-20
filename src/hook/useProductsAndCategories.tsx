import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {api} from "../api/api";
import {Category, Product} from "../AppState";
import {fetchCategoriesSuccessAction, fetchProductsSuccessAction} from "../admin/redux/productsReducer";
import {Notify} from "../notify";


const useProductsAndCategories = () => {

    const dispatch = useDispatch()

    let [loading, setLoading] = useState<boolean>(false);
    let [error, setError] = useState<string>();

    useEffect(() => {
        setLoading(true)

        api.fetchCategories().then((data: Category[]) => {

            dispatch(fetchCategoriesSuccessAction({data: data}));

            //TODO could there be a race condition here?
            api.fetchProducts().then((products: Product[]) => {
                dispatch(fetchProductsSuccessAction({data: products}));
            }).catch((error: { message: any; }) => {
                Notify.error(`Error fetching products : ${error.message}`);
                setError(error.message)
            }).finally(() => {
                setLoading(false)
            });
        }).catch((error: { message: any; }) => {
            Notify.error(`Error fetching categories : ${error.message}`);
            setError(error.message)
        }).finally(() => {
            // setLoading(false)
        });
    }, []);


    return [loading, error]

}
export default useProductsAndCategories;