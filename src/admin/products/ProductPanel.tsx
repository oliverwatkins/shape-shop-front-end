import * as React from "react";
import type {Product} from "../../AppState";
import {ProductItem} from "./ProductItem";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box, Grid} from "@mui/material";
import OKCancelDialog from "../common/OKCancelDialog";
import CategoryDialog from "./CategoryDialog";
import ProductDialog from "./ProductDialog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import * as constants from "../../constants";
import {baseURL} from "../../api/api";
import {
    createDeleteProductAction,
    createDeleteProductServiceAction,
    createUpdateProduct
} from "../redux/productActions";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../AppState";

type Props = {
    products?: Array<Product>,
    category: string
}

export default function ProductPanel(props: Props) {
    const dispatch = useDispatch();
    const Authorization: any = useSelector((state: AppState)=>state.login.loginToken)

    let editProductCallback = (item: Product) => {
        setSelectedProduct(item)
        setOpenEditPProduct(true)
    }


    let deleteProductCallback = (item: Product) => {
        dispatch(createDeleteProductServiceAction(item, Authorization))
    }




    const [selectedProduct, setSelectedProduct] = React.useState<Product>();

    const [openEditPProduct, setOpenEditPProduct] = React.useState(false);
    const [openCreateProduct, setOpenCreateProduct] = React.useState(false);

    const [openCategoryDialog, setOpenCategoryDialog] = React.useState(false);

    const [deleteCatDialogOpen, setDeleteCatDialogOpen] = React.useState(false);


    const style = {
        marginLeft: "0.5em",
        marginRight: "0.5em"
    }

    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: 'primary.white',
                    display: 'flex'
                }}
            >
                <Typography variant="h6" color='primary' sx={{ flexGrow: 1 }}>
                    Category : {props.category}
                </Typography>

                {/*add product*/}
                <Button startIcon={<AddCircleOutlineIcon/>} sx={style} onClick={() => setOpenCreateProduct(true)} variant={"contained"}> Add Product</Button>
                {/*openEditProduct*/}

                {openCreateProduct && <ProductDialog open={openCreateProduct} type={"Create"} handleCancel={() => setOpenCreateProduct(false)} handleSubmit={
                    (values) => {
                        dispatch(createUpdateProduct({...values, id: "-1", type: props.category}, Authorization));
                        setOpenCreateProduct(false);
                    }
                }/>}

                {openEditPProduct && <ProductDialog product={selectedProduct} open={openEditPProduct} type={"Edit"} handleCancel={() => setOpenEditPProduct(false)} handleSubmit={
                    values =>{
                        // alert("save")
                        dispatch(createUpdateProduct({...values, id: selectedProduct?.id}, Authorization));
                        setOpenEditPProduct(false);
                    }
                }/>}

                {/*edit category*/}
                <Button startIcon={<EditIcon/>} variant={"contained"} sx={style} onClick={() => setOpenCategoryDialog(true)}>
                    Edit Category</Button>
                {openCategoryDialog && <CategoryDialog type={"Edit"}
                      handleCancel={() => {
                          setOpenCategoryDialog(false)
                      }}
                      handleSubmit={() => {
                          setOpenCategoryDialog(false)
                          alert("yeah C");
                      }}
                      open={openCategoryDialog}/>

                }

                {/*delete category*/}
                <Button onClick={()=>setDeleteCatDialogOpen(true)} variant={"outlined"} sx={style}>Delete Category</Button>
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

                {/*<ProductDialog type={"Edit"} callBack={(val: string)=>alert("value = " + val)}/>*/}
            </Box>

            {props.products &&
            <Grid container spacing={2}>
                {
                    props.products && props.products.map((product, i) =>
                        <Grid key={i} item xs={4} lg={2}>
                            <ProductItem key={i} item={product} editProductCallback={editProductCallback} deleteProductCallback={deleteProductCallback}/>
                        </Grid>
                        )
                }
            </Grid>
            }
        </Box>
    )
}


