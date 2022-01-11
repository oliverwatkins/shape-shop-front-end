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

type Props = {
    products?: Array<Product>,
    category: string
}

export default function ProductPanel(props: Props) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openP, setOpenP] = React.useState(false);
    const handleOpenP = () => setOpenP(true);
    const handleCloseP = () => setOpenP(false);

    const [openC, setOpenC] = React.useState(false);
    const handleOpenC = () => setOpenC(true);
    const handleCloseC = () => setOpenC(false);

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
                <Button startIcon={<AddCircleOutlineIcon/>} sx={style} onClick={handleOpenP} variant={"contained"}> Add Product</Button>
                {openP && <ProductDialog open={openP} type={"Create"} handleCancel={() => handleCloseP()} handleSubmit={data =>{
                    alert("save")
                    handleClose();
                } }/>}

                {/*edit category*/}
                <Button startIcon={<EditIcon/>} variant={"contained"} sx={style} onClick={handleOpenC}>
                    Edit Category</Button>
                {openC && <CategoryDialog type={"Edit"}
                              handleCancel={() => {
                                  handleCloseC();
                              }}
                              handleSubmit={() => {
                                  handleCloseC();
                                  alert("yeah C");
                              }}
                              open={openC}/>

                }

                {/*delete category*/}
                <Button onClick={handleOpen} variant={"outlined"} sx={style}>Delete Category</Button>
                {open && <OKCancelDialog open={true} title={"Delete Thing!"}
                             content={"Are you sure you want to delete thing?"}
                             handleOK={() => {
                                 handleClose();
                                 alert("yeah")
                             }}
                             handleCancel={() => {
                                 handleClose();
                             }}/>
                }

                {/*<ProductDialog type={"Edit"} callBack={(val: string)=>alert("value = " + val)}/>*/}
            </Box>

            {props.products &&
            <Grid container spacing={2}>
                {
                    props.products && props.products.map((product, i) =>
                        <Grid key={i} item xs={4} lg={2}>
                            <ProductItem key={i} item={product}/>
                        </Grid>
                        )
                }
            </Grid>
            }
        </Box>
    )
}


