import * as React from 'react';
import {useSelector} from "react-redux";
import type {AppState} from "../AppState";
import {OrderStateType} from "../AppState";

import OrderPanel from "./OrderPanel";
import {Link, Route, Switch} from "react-router-dom";
import "./admin.scss";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ProductsPanel from "./products/ProductsPanel";

export default function AdminScreen() {


    //todo move to constants
    let paddingLeft = "40px"
    let marginTop = "0px"


    let loginToken = useSelector((state: AppState) => state.login.loginToken)


    let prodUrl = false

    //kind of hacky but refactor when updating router
    if (window.location.href.endsWith("admin/products")) {
        prodUrl = true
    }

    //tab state : (move into hook?)
    const [topTabValue, setTopTabValue] = React.useState<number>(prodUrl ? 1 : 0);
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
                display: "flex",
                mt: "20px",
                mr: "30px"
            }}>
                <Box sx={{ml: paddingLeft, mt: marginTop}} >
                    <Typography variant="h4" color='primary'>Administration Console</Typography>
                    <Typography variant="body1" color='primary'>Manage orders, products,
                        categories, and settings</Typography>
                </Box>
                <Box sx={{ml: "auto", mt: marginTop}}>
                    <Button component={Link} to="/" endIcon={<DoubleArrowIcon/>} variant={"contained"}>To
                        website </Button>
                </Box>
                <Box sx={{ml: "2em", mt: marginTop}}>
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
                sx={{ml: paddingLeft, mt: "0px"}}
            >
                <Tab label="Orders" component={Link} to={"/admin/orders"} {...a11yProps(0)}/>
                <Tab label="Products" component={Link} to={"/admin/products"}  {...a11yProps(1)} />
                <Tab label="Settings" component={Link} to={"/admin/settings"} {...a11yProps(2)} />
            </Tabs>

            {/*TODO refactor to current way of using browserrouter*/}
            <Switch>
                <Route path="/admin/orders">
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={orderTabValue} onChange={handleOrderTab}
                                  sx={{ml: paddingLeft, mt: "0px"}}
                            >
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
                            {orderTabValue === 0 && <OrderPanel type={OrderStateType.OPEN} Authorization={loginToken}/>}
                        </Box>
                        <Box
                            sx={{p: 3}}
                            role="tabpanel"
                            hidden={orderTabValue !== 1}
                            id={`simple-tabpanel-${1}`}
                            aria-labelledby={`simple-tab-${1}`}
                        >
                            {orderTabValue === 1 && <OrderPanel type={OrderStateType.CLOSED} Authorization={loginToken}/>}
                        </Box>
                    </Box>
                </Route>
                <Route exact path="/admin/products">
                    <ProductsPanel/>
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
