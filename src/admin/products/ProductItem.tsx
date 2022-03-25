import * as React from "react";
import Button from "@material-ui/core/Button";
import {ErrorBoundary} from "../../misc/ErrorBoundary";
import {Product} from "../../AppState";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import "./productItem.scss";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    Grid,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    styled,
    TextField
} from "@mui/material";
import {IconButtonProps} from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhotoIcon from '@mui/icons-material/Photo';

import * as Constants from "./../../constants";

type Props = {
    item: Product;
    editProductCallback: (arg0: Product) => void;
    deleteProductCallback: Function;
    updateImageCallback: Function;
};

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}: any) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export function ProductItem(props: Props) {

    const [expanded, setExpanded] = React.useState(false);

    let product = props.item;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const heigt = 25;
    return (
        <Card className="admin-item-box">
            <CardHeader
                action={
                    <>
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleCloseMenu}
                            PaperProps={{
                                style: {
                                    maxHeight: heigt * 4.5,
                                    width: 200,
                                },
                            }}
                        >
                            <MenuItem key={"1"} selected={false} onClick={() => props.editProductCallback(product)}
                            >
                                <ListItemIcon>
                                    <EditIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Edit"/>
                            </MenuItem>
                            <MenuItem key={"2"} selected={false} onClick={() => props.updateImageCallback(product)}
                            >
                                <ListItemIcon>
                                    <PhotoIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Update Image"/>
                            </MenuItem>
                            <MenuItem key={"3"} selected={false} onClick={() => props.deleteProductCallback(product)}
                            >
                                <ListItemIcon>
                                    <DeleteIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Delete"/>
                            </MenuItem>
                        </Menu>
                    </>
                }
                title={
                    product.name
                }
            />
            <CardMedia
                component="img"
                height="250px"
                width="300px"
                image={Constants.baseURL + "images/" + Constants.company + "/" + product.imageFilename}
                alt={product.imageFilename}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <ErrorBoundary>
                        <Box className={"admin-item-edit-buttons"}>
                            <Button onClick={() => props.deleteProductCallback(product)}>
                                <DeleteIcon/>
                            </Button>
                            <Button onClick={() => props.editProductCallback(product)}>
                                <EditIcon/>
                            </Button>
                        </Box>
                        {getProductFields(product)}
                    </ErrorBoundary>
                </CardContent>
            </Collapse>
            <CardActions>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
        </Card>
    );
}

function getProductFields(product: Product) {
    return <Box m={1}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label={"name"}
                    variant="outlined"
                    fullWidth={true}
                    value={product.name}/>
            </Grid>
            <Grid item xs={12}>
                <TextField multiline variant="outlined"
                           fullWidth={true}
                           maxRows={4} minRows={4}
                           label={"description"} value={product.description}/>

            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined"
                           fullWidth={true}
                    // InputLabelProps={{style: {fontFamily: 'Arial', fontSize: 16}}}
                    // inputProps={{style: {fontFamily: 'Arial', fontSize: 18}}}
                           label={"price"}
                           value={"€ " + product.price}/>
            </Grid>
        </Grid>
    </Box>;
}