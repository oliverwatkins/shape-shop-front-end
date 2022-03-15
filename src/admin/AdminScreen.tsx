import * as React from 'react';
import {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import type {AdminState, AppState, OrderState, Product} from "../AppState";
import {createFetchOrdersSuccessAction} from "./redux/adminActions";

import OrderPanel from "./OrderPanel";
import {selectClosedOrders, selectOpenOrders, selectProductsByType} from "../selectors";
import ProductPanel from "./products/ProductPanel";
import {Link, Route, Switch} from "react-router-dom";
import "./admin.scss";
import {AppBar, Box, CircularProgress, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {Authorization, OrderStateType} from "../AppState";
import {api} from "../api/api";
import {useAsync} from "react-async-hook";
import {Redirect} from "react-router";

type Props = {
    orders?: Array<OrderState>,
    closedOrders?: Array<OrderState>,
    fetchOrders?: () => void,
    dispatch?: Function,
    Authorization?: Authorization,
    products1?: Array<Product>,
    products2?: Array<Product>
}

function TabPanel(props: any) {
    const {children, value, index, ...other} = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </Box>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function AdminScreen(props: Props) {

    if (!props.Authorization?.token) {
        // alert("undauthorized!!")
    }

    let dispatch = useDispatch();

    //tab state :
    const [topTabValue, setTopTabValue] = React.useState(0);
    const handleTopTab = (event: any, newValue: any) => {
        setTopTabValue(newValue);
    };

    const [productTabValue, setProductTabValue] = React.useState(0);
    const handleProdTab = (event: any, newValue: any) => {
        setProductTabValue(newValue);
    };

    const [orderTabValue, setOrderTabValue] = React.useState(0);
    const handleOrderTab = (event: any, newValue: any) => {
        setOrderTabValue(newValue);
    };

    const {
        loading: orderLoading,
        error: orderError,
        result: orders = null,
    } = useAsync<OrderState[]>(api.fetchOrders, [props.Authorization]);

    useEffect(() => {
        if (orders) {
            dispatch(createFetchOrdersSuccessAction(orders));
        }
    }, [orders]);


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

                    {orderLoading &&  <CircularProgress color="secondary" />}
                    {orderError &&
                        // <Redirect to="/login/" />
                        // TODO
                        <span>ERROR order error </span>
                    }

                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={orderTabValue} onChange={handleOrderTab}
                                // className={classes.tab2}
                            >
                                <Tab label="Open Orders" {...a11yProps(0)} />
                                <Tab label="Closed Orders" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={orderTabValue} index={0}>
                            <OrderPanel type={"open"} orders={props.orders}/>
                        </TabPanel>
                        <TabPanel value={orderTabValue} index={1}>
                            <OrderPanel orders={props.closedOrders}/>
                        </TabPanel>
                    </Box>
                </Route>
                <Route exact path="/admin/products">

                    {/*// TODO changed label to title in div component. need to update the Tabs component.*/}
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
                                    </Toolbar>
                                </AppBar>
                            </Box>
                            <Box>
                                <Tabs
                                    value={productTabValue} onChange={handleProdTab} aria-label="asdfe">
                                    <Tab label="Products 1" {...a11yProps(0)} />
                                    <Tab label="Products 2" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={productTabValue} index={0}>
                                <ProductPanel key={1} products={props.products1} category={"main"}/>
                            </TabPanel>
                            <TabPanel value={productTabValue} index={1}>
                                <ProductPanel key={2} products={props.products2} category={"drinks"}/>
                            </TabPanel>
                        </Box>
                    </Box>
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
        products1: selectProductsByType(state, "main"),
        products2: selectProductsByType(state, "drinks"),
        orders: selectOpenOrders(state.admin.orders),
        closedOrders: selectClosedOrders(state.admin.orders),
        Authorization: state.login.loginToken,
    };
};

export default connect(
    mapStateToProps,
    null,
)(AdminScreen);
