import * as React from "react";
import Typography from '@mui/material/Typography';
import {AppBar, Box, Tab, Tabs, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useEffect, useReducer} from "react";
import {useAsync} from "react-async-hook";
import {AppState, Category, Product} from "../../AppState";
import {api} from "../../api/api";
import {createFetchProductsSuccessAction} from "../redux/productsReducer";
import ProductPanel from "./ProductPanel";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function ProductsPanel() {

    const categories = useSelector((state: AppState) => state.products.categories)
    const categoryProducts = useSelector((state: AppState) => state.products.categoryProducts)
    const dispatch = useDispatch()

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const {
        loading: productLoading,
        error: productError,
        result: products = null,
    } = useAsync<Product[]>(api.fetchProducts, []);

    useEffect(() => {
        if (products) {
            dispatch(createFetchProductsSuccessAction({data: products}));
        }
    }, [products]);

    const [productTabValue, setProductTabValue] = React.useState<number>(0);
    const handleProdTab = (event: any, newValue: number) => {
        setProductTabValue(newValue);
    };

    let category = categories[productTabValue];

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
                            {/*<Button startIcon={<AddCircleOutlineIcon/>} sx={buttonStyle} onClick={() => setOpenCreateProduct(true)}*/}
                            {/*        variant={"contained"}>*/}
                            {/*    Add Product</Button>*/}
                            <Button startIcon={<AddCircleOutlineIcon/>}
                                    variant={"contained"}>
                                Create Category</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box key={"tabs"}>
                    <Tabs value={productTabValue} onChange={handleProdTab} aria-label="asdfe">
                        {
                            categories.map((category: Category, i:number) =>
                            <Tab label={category.name} {...a11yProps(i)} />
                            )
                        }
                    </Tabs>
                </Box>
                {categoryProducts && <ProductPanel key={productTabValue} category={category} products={categoryProducts[category.name]}/>}
            </Box>
        </Box>
    )
}
