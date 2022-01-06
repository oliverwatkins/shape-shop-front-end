import * as React from "react";
import Button from "@material-ui/core/Button";
import {ProductItemEdit} from "./ProductItemEdit";
import {ErrorBoundary} from "../../misc/ErrorBoundary";
import {Product} from "../../AppState";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {FileUploadModal} from "../FileUpload/FileUploadModal";
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
    TextField, Typography
} from "@mui/material";
import {IconButtonProps} from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhotoIcon from '@mui/icons-material/Photo';

import * as Constants from "./../../constants";

type Props = { item: Product };

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

// const StyledCardHeader = styled(({ ...other }) => <CardHeader {...other} />)`
//   & .MuiCardHeader-content {
//     flex: 1 1 auto;
//     width: 100%;
//   }
// `;

export function ProductItem(props: Props) {

    const [expanded, setExpanded] = React.useState(false);

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

    let product = props.item;

    const [editMode, setEditMode] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    const handleClose = () => {
        setShowModal(false);
    };

    const heigt = 25;
    return (
        <Card className="admin-item-box">

            {/*<StyledCardHeader*/}
            {/*    title="very long title werwerwerwerwerwerwerwerwerwerwerwerwerwer"*/}
            {/*    titleTypographyProps={{*/}
            {/*        noWrap: true*/}
            {/*    }}*/}
            {/*/>*/}


            <CardHeader

                // titleTypographyProps={{
                //     noWrap: true
                // }}

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
                            <MenuItem key={"1"} selected={false} onClick={handleCloseMenu}
                            >
                                <ListItemIcon>
                                    <EditIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Edit"/>
                            </MenuItem>
                            <MenuItem key={"2"} selected={false} onClick={handleCloseMenu}
                            >
                                <ListItemIcon>
                                    <PhotoIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Update Image"/>
                            </MenuItem>
                            <MenuItem key={"3"} selected={false} onClick={handleCloseMenu}
                            >
                                <ListItemIcon>
                                    <DeleteIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Delete"/>
                            </MenuItem>
                        </Menu>
                    </>
                }
                title= {
                    product.name
                }
                // subheader={
                //     <Typography noWrap gutterBottom >
                //         {product.description}
                //     </Typography>
                // }
            />




            <CardMedia
                component="img"
                height="194"
                image={Constants.baseURL + "images/" + Constants.company + "/" + product.imageFilename}
                alt={product.imageFilename}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <ErrorBoundary>
                        {showModal &&
                            <FileUploadModal onClose={() => setShowModal(false)} item={product} onClick={handleClose}/>
                        }
                        {editMode &&
                            <ProductItemEdit product={product} setEditMode={setEditMode}/>
                        }
                        {!editMode &&
                            <>
                                <Box className={"admin-item-edit-buttons"}>

                                    <Button onClick={e => alert("TODO")}><DeleteIcon/></Button>
                                    <Button onClick={e => {
                                        setEditMode(true);
                                    }}><EditIcon/></Button>
                                </Box>
                                {/*<Box className={"admin-item-box-image-box"}>*/}

                                {/*    <Box className={"admin-item-update-image-button-box"}>*/}
                                {/*        <Button*/}
                                {/*            className={"admin-item-update-image-button"}*/}
                                {/*            onClick={e => {*/}
                                {/*                setShowModal(true);*/}
                                {/*            }}>update image</Button>*/}
                                {/*    </Box>*/}

                                {/*{product.image &&*/}
                                {/*    // for storybook :*/}
                                {/*    <img className={"admin-item-box-image"}*/}
                                {/*         src={product.image}*/}
                                {/*         alt={product.imageFilename}/>*/}
                                {/*}*/}
                                {/*{product.imageFilename &&*/}
                                {/*    <img className={"admin-item-box-image"}*/}
                                {/*         src={Constants.baseURL + "images/" + Constants.company + "/" + product.imageFilename}*/}
                                {/*         alt={product.imageFilename}/>*/}
                                {/*}*/}
                                {/*</Box>*/}

                                {getProductFields(product)}
                            </>
                        }
                    </ErrorBoundary>
                </CardContent>
            </Collapse>
            <CardActions>
                {/*<IconButton aria-label="add to favorites">*/}
                {/*    <FavoriteIcon/>*/}
                {/*</IconButton>*/}
                {/*<IconButton aria-label="share">*/}
                {/*    <ShareIcon/>*/}
                {/*</IconButton>*/}
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
                    // size=medium
                    // InputLabelProps={{style: {fontFamily: 'Arial', fontSize: 16}}}
                    // inputProps={{style: {fontFamily: 'Arial', fontSize: 18}}}
                    label={"name"}
                    variant="outlined"
                    fullWidth={true}
                    value={product.name}/>
            </Grid>

            <Grid item xs={12}>
                <TextField multiline variant="outlined"
                           fullWidth={true}

                    // InputLabelProps={{style: {fontFamily: 'Arial', fontSize: 16}}}
                    // inputProps={{style: {fontFamily: 'Arial', fontSize: 18}}}

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