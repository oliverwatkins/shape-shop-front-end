import * as React from "react";
import Typography from '@mui/material/Typography';
import {AppBar, Box, CircularProgress, Tab, Tabs, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {AppState, Category} from "../../AppState";
import ProductPanel from "./ProductPanel";
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CategoryDialog from "./CategoryDialog";
import useFetchProductsAndCategories from "../../hook/useProductsAndCategories";

export default function ProductsPanel() {

    const [createCatDialogOpen, setCreateCatDialogOpen] = React.useState(false);

    const categories = useSelector((state: AppState) => state.products.categories)

    const categoryProducts = useSelector((state: AppState) => state.products.categoryProducts)

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    let [loading, error] = useFetchProductsAndCategories();

    const [productTabValue, setProductTabValue] = React.useState<number>(0);
    const handleProdTab = (event: any, newValue: number) => {
        setProductTabValue(newValue);
    };


    let category = categories[productTabValue];

    // @ts-ignore
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
                    {/*TODO generic error panel :*/}
                    {error && <span>{error}</span>}

                    <Box key={"tabs"}>
                        <Tabs value={productTabValue} onChange={handleProdTab} aria-label="products-tab">
                            {
                                categories.map((category: Category, i:number) => {
                                    return <Tab key={category.name} label={category.name} {...a11yProps(i)} />
                                })
                            }
                        </Tabs>
                    </Box>
                    {categoryProducts && <ProductPanel key={productTabValue} category={category} products={categoryProducts[category.name]}/>}
                </Box>
            </Box>
        </>
    )
}
