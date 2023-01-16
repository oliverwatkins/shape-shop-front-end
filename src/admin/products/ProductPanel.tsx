import * as React from "react";
import {useReducer} from "react";
import type {Category, Product} from "../../AppState";
import {AppState, ProductsState} from "../../AppState";
import {ProductItem} from "./ProductItem";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box, Grid, Tooltip} from "@mui/material";
import OKCancelDialog from "../common/OKCancelDialog";
import CategoryDialog from "./CategoryDialog";
import ProductDialog from "./ProductDialog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import {api} from "../../api/api";
import {deleteCategoryAction, deleteProductAction, productsReducer} from "../redux/productsReducer";
import {useSelector} from "react-redux";
import {Notify} from "../../notify";
import {FileUploadDialog} from "../FileUpload/FileUploadDialog";

type Props = {
    category: Category,
    products: Array<Product> | null
}

const initialState: ProductsState = {
    categories: [],
    allProducts: [],
    categoryProducts: {},
    productsError: "",
    updatingProduct: false,
};

/**
 * Show products for a categoy.
 */
export default function ProductPanel(props: Props) {

    const [state, dispatch] = useReducer(productsReducer, initialState); //TODO useDispatch

    const Authorization: any = useSelector((state: AppState) => state.login.loginToken)

    const [selectedProduct, setSelectedProduct] = React.useState<Product>();

    const [openEditPProduct, setOpenEditPProduct] = React.useState(false);
    const [openUpdateImage, setOpenUpdateImage] = React.useState(false);
    const [openCreateProduct, setOpenCreateProduct] = React.useState(false);
    const [openCategoryDialog, setOpenCategoryDialog] = React.useState(false);
    const [deleteCatDialogOpen, setDeleteCatDialogOpen] = React.useState(false);

    //todo move into ProductItem?
    const deleteProductCallback = async (item: Product) => {
        api.deleteProduct(item, Authorization).then(() => {
            dispatch(deleteProductAction({product: item}))
            Notify.success("Deleted Product " + item.name);
        }).catch((error: { message: any; }) => {
            Notify.error(`Deleted Product error ${error.message}`);
        });
    }

    const deleteCategory = async (item: Category) => {
        api.deleteCategory(item, Authorization).then(() => {
            dispatch(deleteCategoryAction({category: item}))
            Notify.success("Deleted Category " + item.name);
        }).catch((error: { message: any; } | string) => {
            Notify.error(`Deleted Category error ${error}`);
        });
    }

    const buttonStyle = {
        marginLeft: "0.5em",
        marginRight: "0.5em"
    }

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'primary.white',
                    display: 'flex',
                    p: 3
                }}
            >
                {/*todo leave heading here, otherwise tests wont work*/}
                <Typography variant="h6" color='primary' sx={{flexGrow: 1}}>
                    products of category {props.category?.name}
                </Typography>

                {/*add product*/}
                <Button startIcon={<AddCircleOutlineIcon/>} sx={buttonStyle} onClick={() => setOpenCreateProduct(true)}
                        variant={"contained"}>
                    Add Product</Button>
                {/*openEditProduct*/}

                {openUpdateImage && selectedProduct && <FileUploadDialog open={openUpdateImage}
                                                                         product={selectedProduct}
                                                                         handleCancel={() => setOpenUpdateImage(false)}/>}

                {openEditPProduct && <ProductDialog open={openEditPProduct}
                                                    type={"Edit"}
                                                    product={selectedProduct}
                                                    handleClose={() => setOpenEditPProduct(false)} />}

                {openCreateProduct && <ProductDialog open={openCreateProduct}
                                                     type={"Create"}
                                                     handleClose={() => setOpenCreateProduct(false)}

                />}

                {/*edit category*/}
                <Button startIcon={<EditIcon/>} variant={"contained"} sx={buttonStyle}
                        onClick={() => setOpenCategoryDialog(true)}>
                    Edit Category</Button>
                {openCategoryDialog && props.category && <CategoryDialog type={"Edit"}
                                                       handleClose={() => {
                                                           setOpenCategoryDialog(false)
                                                       }}
                                                       open={openCategoryDialog} category={props.category}/>
                }
                {/*delete category*/}
                {/*TODO tooltip only working on enabled buttons*/}
                <Tooltip title="Can only delte Category if there are no products" arrow>
                <Button disabled={!!props.products as boolean} onClick={() => setDeleteCatDialogOpen(true)} variant={"outlined"} sx={buttonStyle}>Delete
                    Category</Button>
                    </Tooltip>
                {deleteCatDialogOpen && <OKCancelDialog open={true} title={"Delete Thing!"}
                                                        content={"Are you sure you want to delete thing?"}
                                                        handleOK={() => {
                                                            // alert("yeah! delete")
                                                            deleteCategory(props.category);
                                                            setDeleteCatDialogOpen(false);
                                                        }}
                                                        handleCancel={() => {
                                                            setDeleteCatDialogOpen(false);
                                                        }}/>
                }
            </Box>
            {/*TODO*/}
            {/*{productLoading &&*/}
            {/*    <div style={{display: 'flex', justifyContent: 'center'}}>*/}
            {/*        <CircularProgress*/}
            {/*            size={100}*/}
            {/*            color="secondary"/>*/}
            {/*    </div>*/}
            {/*}*/}
            {/*{productError &&*/}
            {/*    <span>Fetch Product Error </span>*/}
            {/*}*/}
            {!props.products && <h4>No Products</h4>}

            {props.products &&
                <Grid container spacing={2}>
                {
                    props.products && props.products.map((product: Product, i:number) =>
                        <Grid key={i} item xs={4} lg={2}>
                            <ProductItem key={i} item={product}
                                 editProductCallback={
                                     // openEditProductDialog
                                     (item: Product) => {
                                         setSelectedProduct(item)
                                         setOpenEditPProduct(true)
                                     }
                                 }
                                 updateImageCallback={
                                     (item: Product) => {
                                         setSelectedProduct(item)
                                         setOpenUpdateImage(true)
                                     }
                                 }
                                 deleteProductCallback={
                                     deleteProductCallback
                                 }
                            />
                        </Grid>)
                }
                </Grid>
            }
        </>
    )
}