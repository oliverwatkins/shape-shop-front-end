import * as React from "react";
import Typography from '@mui/material/Typography';
import {AppBar, Box, Tab, Tabs, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useEffect, useReducer} from "react";
import {productsReducer} from "../redux/productsReducer";
import {useAsync} from "react-async-hook";
import {AppState, Category, Product, ProductsState} from "../../AppState";
import {api} from "../../api/api";
import {createFetchProductsSuccessAction} from "../redux/productActions";
import ProductPanel from "./ProductPanel";
import {connect} from "react-redux";

type Props = {
    categoryProducts: { [category: string]: Array<Product> }
    categories: Array<Category>
}

export function ProductsPanel(props: Props) {

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    //TODO why do we have initial state when using useReducer, but we also need in in the reducer itself?
    const [state, dispatch] = useReducer(productsReducer, {updatingProduct:false, allProducts:[], productsError:"", categories: [], categoryProducts: {}});

    const {
        loading: productLoading,
        error: productError,
        result: products = null,
    } = useAsync<Product[]>(api.fetchProducts, []);

    useEffect(() => {
        if (products) {
            dispatch(createFetchProductsSuccessAction(products));
        }
    }, [products]);

    const [productTabValue, setProductTabValue] = React.useState<number>(0);
    const handleProdTab = (event: any, newValue: number) => {
        setProductTabValue(newValue);
    };

    let category = props.categories[productTabValue];

    return (
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
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box>
                    <Tabs value={productTabValue} onChange={handleProdTab} aria-label="asdfe">
                        {
                            props.categories.map((category: Category, i:number) =>
                            <Tab label={category.name} {...a11yProps(i)} />
                            )
                        }
                    </Tabs>
                </Box>
                {props.categoryProducts && <ProductPanel key={productTabValue} category={category} products={props.categoryProducts[category.name]}/>}
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState): ProductsState => {
    return {
        allProducts: state.products.allProducts,
        productsError: "",
        updatingProduct: false,
        categories: state.products.categories,
        categoryProducts: state.products.categoryProducts
        // Authorization: state.login.loginToken,
    };
};

export default connect(
    mapStateToProps,
    null,
)(ProductsPanel);
