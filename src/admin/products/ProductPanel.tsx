import * as React from "react";
import type {Product} from "../../AppState";
import {ProductItem} from "./ProductItem";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box, Grid} from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import OKCancelDialog from "./OKCancelDialog";
import CategoryModal from "./CategoryModal";

type Props = {
    products?: Array<Product>,
    category: string
}

export default function ProductPanel(props: Props) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

                <Button onClick={handleOpen}> Delete Category</Button>
                {open && <OKCancelDialog open={true} title={"Delete Thing!"}
                                         content={"Are you sure you want to delete thing?"}
                                         handleOK={() => {
                                             handleClose();
                                             alert("yeah")
                                         }}
                                         handleCancel={() => {
                                             handleClose();
                                             alert("cancel")
                                         }}/>}

                {/*<Button onClick={e => alert("TODO")} ><DeleteIcon/> Delete Category</Button>*/}

                <CategoryModal type={"Edit"} callBack={(val: string)=>alert("value = " + val)}/>
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


