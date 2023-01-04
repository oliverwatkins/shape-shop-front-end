import * as React from "react";
import type {Category, Product} from "../../AppState";
import {ProductItem} from "./ProductItem";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box, CircularProgress, Grid} from "@mui/material";
import OKCancelDialog from "../common/OKCancelDialog";
import CategoryDialog from "./CategoryDialog";
import ProductDialog from "./ProductDialog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import {api} from "../../api/api";
import {
    createAddProductAction,
    createDeleteProductAction, 
    createUpdateProductSuccessAction
} from "../redux/productsReducer";
import {useSelector} from "react-redux";
import {AppState, ProductsState} from "../../AppState";
import {Notify} from "../../notify";
import {FileUploadDialog} from "../FileUpload/FileUploadDialog";
import {useReducer} from "react";
import {productsReducer} from "../redux/productsReducer";

type Props = {
    category?: Category,
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

    const deleteProductCallback = async (item: Product) => {
        try {
            await api.deleteProduct(item, Authorization)

            //will this work??
            dispatch(createDeleteProductAction({product: item}))
            Notify.success("Deleted Product " + item.name);
        } catch (e) {
            //TODO this will not catch errors here. Use useAsync (See OrderPanel)
            console.error(e)
            Notify.error("Error deleting product")
        }
    }




//     let editProductCallback = async (item: Product) => {
//         try {
//             await api.updateProduct(item, Authorization)
//
//             //after update in backend, update the state from this component
//             dispatch(createUpdateProductSuccessAction({product: item}))
//
//             setOpenEditPProduct(false);
//
//             Notify.success("Edited Product " + item.name);
//         } catch (e) {
//             console.error(e)
//
//             // dispatch(createUpdateProductAction({product: item})) //TODO fail action?
// //TODO this will not catch errors here. Use useAsync (See OrderPanel)
//             setOpenEditPProduct(false);
//             Notify.error("Error editing product");
//         }
//     }





    let editCategoryCallback = async (item: Category) => {
        try {
            alert("editCategoryCallback TODO")
            setOpenCategoryDialog(false);
            Notify.success("Edited Product " + item.name);
        } catch (e) {
            console.error(e)
            setOpenCategoryDialog(false);
            Notify.error("Error editing category");
        }
    }

    const createProductCallback = async (item: Product) => {
        try {
            await api.createProduct(item, Authorization)
            dispatch(createAddProductAction({product: item}));

            setOpenCreateProduct(false);
            Notify.success("Created Product " + item.name);
        } catch (e) {
            //TODO this will not catch errors here. Use useAsync (See OrderPanel)
            Notify.error("Error creating product");
        }
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
                <Typography variant="h6" color='primary' sx={{flexGrow: 1}}>
                    Category : {props.category?.name}
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
                                                    // handleSubmit={editProductCallback}
                                                    handleCancel={() => setOpenEditPProduct(false)} />}

                {openCreateProduct && <ProductDialog open={openCreateProduct} type={"Create"}
                                                     handleCancel={() => setOpenCreateProduct(false)}
                                                     // handleSubmit={createProductCallback}

                />}

                {/*edit category*/}
                <Button startIcon={<EditIcon/>} variant={"contained"} sx={buttonStyle}
                        onClick={() => setOpenCategoryDialog(true)}>
                    Edit Category</Button>
                {openCategoryDialog && props.category && <CategoryDialog type={"Edit"}
                                                       handleCancel={() => {
                                                           setOpenCategoryDialog(false)
                                                       }}
                                                       handleSubmit={editCategoryCallback}
                                                       open={openCategoryDialog} category={props.category}/>
                }
                {/*delete category*/}
                <Button onClick={() => setDeleteCatDialogOpen(true)} variant={"outlined"} sx={buttonStyle}>Delete
                    Category</Button>
                {deleteCatDialogOpen && <OKCancelDialog open={true} title={"Delete Thing!"}
                                                        content={"Are you sure you want to delete thing?"}
                                                        handleOK={() => {
                                                            alert("yeah! delete")
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