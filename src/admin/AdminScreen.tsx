import * as React from 'react';
import {connect} from "react-redux";
import type {AdminState, AppState, OrderState, Product} from "../AppState";
import {Authorization, OrderStateType} from "../AppState";

import OrderPanel from "./OrderPanel";
import ProductPanel from "./products/ProductPanel";
import {Link, Route, Switch} from "react-router-dom";
import "./admin.scss";
import {AppBar, Box, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {useAsync} from "react-async-hook";
import {api} from "../api/api";
import {useEffect, useReducer} from "react";
import {createFetchProductsSuccessAction} from "./redux/productActions";
import {productsReducer} from "./redux/productsReducer";
import ProductsPanel from "./products/ProductsPanel";

type Props = {
    orders?: Array<OrderState>,
    closedOrders?: Array<OrderState>,
    fetchOrders?: () => void,
    dispatch?: Function,
    Authorization?: Authorization,
    products1?: Array<Product>,
    products2?: Array<Product>
}

function AdminScreen(props: Props) {


    //tab state : (move into hook?)
    const [topTabValue, setTopTabValue] = React.useState<number>(0);
    const handleTopTab = (event: any, newValue: number) => {
        setTopTabValue(newValue);
    };



    const [orderTabValue, setOrderTabValue] = React.useState<number>(0);
    const handleOrderTab = (event: any, newValue: number) => {
        setOrderTabValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div className={"admin-screen"}>
            <Box sx={{
                display: "flex"
            }}>
                <Box>
                    <Typography variant="h4" color='primary'>Administration Console</Typography>
                    <Box>
                        <Typography sx={{ml: "2.5em"}} variant="body1" color='primary'>Manage orders, products,
                            categories, and settings</Typography>
                    </Box>
                </Box>
                <Box sx={{marginLeft: "auto"}}>
                    <Button component={Link} to="/" endIcon={<DoubleArrowIcon/>} variant={"contained"}>To
                        website </Button>
                </Box>
                <Box sx={{marginLeft: "2em"}}>
                    <Button component={Link} variant={"text"} to="/logout" color="primary">
                        Logout
                    </Button>
                </Box>
            </Box>

            <Tabs
                // className={classes.tab1}
                TabIndicatorProps={{style: {background: 'red'}}}
                onChange={handleTopTab}
                indicatorColor="secondary"
                textColor="primary"
                variant="standard"
                aria-label="full width tabs example"
                value={topTabValue}
            >
                <Tab label="Orders" component={Link} to={"/admin/orders"} {...a11yProps(0)}/>
                <Tab label="Products" component={Link} to={"/admin/products"}  {...a11yProps(1)} />
                <Tab label="Settings" component={Link} to={"/admin/settings"} {...a11yProps(2)} />
            </Tabs>

            <Switch>
                <Route path="/admin/orders">
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={orderTabValue} onChange={handleOrderTab} >
                                <Tab label="Open Orders" {...a11yProps(0)} />
                                <Tab label="Closed Orders" {...a11yProps(1)} />
                            </Tabs>
                        </Box>

                        <Box
                            sx={{p: 3}}
                            role="tabpanel"
                            hidden={orderTabValue !== 0}
                            id={`simple-tabpanel-${0}`}
                            aria-labelledby={`simple-tab-${0}`}
                        >
                            {orderTabValue === 0 && <OrderPanel type={OrderStateType.OPEN} Authorization={props.Authorization}/>}
                        </Box>
                        <Box
                            sx={{p: 3}}
                            role="tabpanel"
                            hidden={orderTabValue !== 1}
                            id={`simple-tabpanel-${1}`}
                            aria-labelledby={`simple-tab-${1}`}
                        >
                            {orderTabValue === 1 && <OrderPanel type={OrderStateType.CLOSED} Authorization={props.Authorization}/>}
                        </Box>
                    </Box>
                </Route>
                <Route exact path="/admin/products">


                    <ProductsPanel/>


                    {/*// TODO changed label to title in div component. need to update the Tabs component.*/}
                    {/*<Box title={"Products"}>*/}
                    {/*    <Box sx={{width: '100%'}}>*/}
                    {/*        <Box sx={{flexGrow: 1}}>*/}
                    {/*            <AppBar position="static">*/}
                    {/*                <Toolbar>*/}
                    {/*                    <IconButton*/}
                    {/*                        size="large"*/}
                    {/*                        edge="start"*/}
                    {/*                        color="inherit"*/}
                    {/*                        aria-label="menu"*/}
                    {/*                        sx={{mr: 2}}*/}
                    {/*                    >*/}
                    {/*                        <MenuIcon/>*/}
                    {/*                    </IconButton>*/}
                    {/*                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>*/}
                    {/*                        Products*/}
                    {/*                    </Typography>*/}
                    {/*                </Toolbar>*/}
                    {/*            </AppBar>*/}
                    {/*        </Box>*/}
                    {/*        <Box>*/}
                    {/*            <Tabs value={productTabValue} onChange={handleProdTab} aria-label="asdfe">*/}
                    {/*                <Tab label="Products 1" {...a11yProps(0)} />*/}
                    {/*                <Tab label="Products 2" {...a11yProps(1)} />*/}
                    {/*            </Tabs>*/}
                    {/*        </Box>*/}
                    {/*            {productTabValue === 0 && <ProductPanel key={1}*/}
                    {/*                                                    category={{name:"main"}}/>}*/}
                    {/*            {productTabValue === 1 && <ProductPanel key={2}*/}
                    {/*                                                    category={{name:"drinks"}}/>}*/}
                    {/*    </Box>*/}
                    {/*</Box>*/}
                </Route>
                <Route path="/admin/settings">
                    <div title={"Settings"}>
                        <h3 style={{padding: "25px"}}>
                            Marquee on/off :
                        </h3>
                        <div style={{padding: "25px"}}>
                            <input
                                style={{padding: "5px"}}
                                type="checkbox"/>
                            <input style={{margin: "5px", width: "700px"}}
                                   id="street"
                                   type="text"
                                   name="street"
                                   value={"-- Wir haben ab 30. Mai 2020 geöffnet, ab 5. Juni 2020 sind Hochzeiten wieder möglich! -- "}
                            />
                        </div>
                    </div>
                </Route>
            </Switch>
        </div>
    );
}

const mapStateToProps = (state: AppState): AdminState => {
    return {
        Authorization: state.login.loginToken,
    };
};

export default connect(
    mapStateToProps,
    null,
)(AdminScreen);
