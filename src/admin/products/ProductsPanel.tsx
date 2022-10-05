import * as React from "react";
import Typography from '@mui/material/Typography';
import {AppBar, Box, Tab, Tabs, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useEffect, useReducer} from "react";
import {productsReducer} from "../redux/productsReducer";
import {useAsync} from "react-async-hook";
import {AdminState, AppState, Product, ProductsState} from "../../AppState";
import {api} from "../../api/api";
import {createFetchProductsSuccessAction} from "../redux/productActions";
import ProductPanel from "./ProductPanel";
import {connect} from "react-redux";

type Props = {
    categories: Array<string>
}

export function ProductsPanel(props: Props) {

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [state, dispatch] = useReducer(productsReducer, {updatingProduct:false, items:[], productsError:"", categories: [""]});

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
                            props.categories && props.categories.map((value: string, i:number) =>
                            <Tab label={value} {...a11yProps(i)} />
                            )
                        }
                    </Tabs>
                </Box>
                {
                    // props.categories[productTabValue]

                    <ProductPanel key={productTabValue} category={{name:props.categories[productTabValue]}} products={products}/>
                    // props.categories && props.categories.map((value: string, i:number) =>
                    //     <ProductPanel key={i} category={{name:value + "nussig"}} products={products}/>
                    // )
                }

            {/*    {productTabValue === 0 && <ProductPanel key={1}*/}
            {/*                                            category={{name:"main"}} products={products}/>}*/}
            {/*    {productTabValue === 1 && <ProductPanel key={2}*/}
            {/*                                            category={{name:"drinks"}} products={products}/>}*/}
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState): ProductsState => {
    return {
        items: state.products.items,
        productsError: "",
        updatingProduct: false,
        categories: state.products.categories
        // productsAsKeyMap: state.productsX
        // Authorization: state.login.loginToken,
    };
};

export default connect(
    mapStateToProps,
    null,
)(ProductsPanel);
