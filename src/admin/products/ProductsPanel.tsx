import * as React from "react";
import Typography from '@mui/material/Typography';
import {AppBar, Box, CircularProgress, Tab, Tabs, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useEffect, useReducer, useState} from "react";
import {useAsync} from "react-async-hook";
import {AppState, Category, Product} from "../../AppState";
import {api, extractCategories} from "../../api/api";
import {addProductAction, fetchProductsSuccessAction, updateProductSuccessAction} from "../redux/productsReducer";
import ProductPanel from "./ProductPanel";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ProductDialog from "./ProductDialog";
import CategoryDialog from "./CategoryDialog";
import {Notify} from "../../notify";

export default function ProductsPanel() {


    const [createCatDialogOpen, setCreateCatDialogOpen] = React.useState(false);
    let [loading, setLoading] = useState<boolean>(false);
    let [error, setError] = useState<{ message: any }>();
    // let [loading, setLoading] = useState(false);

    const categories = useSelector((state: AppState) => state.products.categories)



    const categoryProducts = useSelector((state: AppState) => state.products.categoryProducts)
    const dispatch = useDispatch()

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    // setLoading(true)
    useEffect(() => {

        // const doit = (productData: Product) => {
        setLoading(true)
        // let cs = extractCategories(productData, categories);
        // productData.categories = cs;


        api.fetchProducts().then((products: Product[]) => {
            // Notify.success("Created Product " + productData.name);
            dispatch(fetchProductsSuccessAction({data: products}));
            // dispatch(addProductAction({product: productData}))
        }).catch((error: { message: any; }) => {
            Notify.error(`onRejected function called: ${error.message}`);
            setError(error)
            // throw "this is an error"
        }).finally(() => {
            setLoading(false)
            // props.handleClose();
        });




    }, []);

    const [productTabValue, setProductTabValue] = React.useState<number>(0);
    const handleProdTab = (event: any, newValue: number) => {
        setProductTabValue(newValue);
    };

    let category = categories[productTabValue];

    return (
        <>

            {createCatDialogOpen && <CategoryDialog
                                    type={"Create"}
                                    handleClose={() => setCreateCatDialogOpen(false)}
                                     open/>}

            <Box title={"Products"}>
                <Box sx={{width: '100%'}}>
                    <Box sx={{flexGrow: 1}}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{mr: 2}}
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    Products
                                </Typography>
                                <Button onClick={() => setCreateCatDialogOpen(true)}  startIcon={<AddCircleOutlineIcon/>}
                                        variant={"contained"}>
                                    Create Category</Button>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    {loading && <CircularProgress color="primary"/>}
                    {error && <span>ERROR product error: {error.message}</span>}

                    <Box key={"tabs"}>
                        <Tabs value={productTabValue} onChange={handleProdTab} aria-label="asdfe">
                            {



                                categories.map((category: Category, i:number) => {
                                        // return <Tab key={category.name} label={category.name} {...a11yProps(i)} />

                                    if (!category)
                                        debugger;
                                        // alert()

                                    return <Tab key={category.name} label={category.name} {...a11yProps(i)} />

                                }


                                )
                            }
                        </Tabs>
                    </Box>
                    {categoryProducts && <ProductPanel key={productTabValue} category={category} products={categoryProducts[category.name]}/>}
                </Box>
            </Box>
        </>
    )
}
