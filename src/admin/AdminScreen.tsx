// @flow

import * as React from 'react';
import {connect, useDispatch} from "react-redux";
import type {AdminState, AppState, OrderState, Product, ProductsState} from "../AppState";
import {createFetchOrdersAction} from "./redux/adminActions";

import "./admin.scss"
import OrderPanel from "./OrderPanel";
import {selectClosedOrders, selectOpenOrders, selectProductsByType} from "../selectors";
import {useEffect} from "react";
import ProductPanel from "./ProductPanel";
import {Link, Route, Switch} from "react-router-dom";
import {useParams, useRouteMatch} from "react-router";
import {Box, makeStyles, Tab, Tabs, Typography} from "@material-ui/core";

type Props = {
	orders?: Array<OrderState>,
	closedOrders?: Array<OrderState>,
	fetchOrders?: ()=>void,
	dispatch?: Function,
	Authorization?: string,
	products1?: Array<Product>,
	products2?: Array<Product>
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

// const secondaryTabColor = "#bad5ff"
// const primaryTabColor = "#4287f5"
const useStyles = makeStyles({
	tab1: {
		background: 'linear-gradient(45deg, #4287f5 30%, #FF8E53 90%)',
		border: 0,
	},
	tab2: {
		background: 'linear-gradient(45deg, #bad5ff 30%, red 90%)',
	},
});

function AdminScreen(props: Props) {

	const classes = useStyles();


	const [topTabValue, setTopTabValue] = React.useState(0);
	const handleTopTab = (event, newValue) => {
		setTopTabValue(newValue);
	};

	const [productTabValue, setProductTabValue] = React.useState(0);
	const handleProdTab = (event, newValue) => {
		setProductTabValue(newValue);
	};

	const [orderTabValue, setOrderTabValue] = React.useState(0);
	const handleOrderTab = (event, newValue) => {
		setOrderTabValue(newValue);
	};

	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(createFetchOrdersAction(props.Authorization));
		}, []);

	return (
		<div className={"admin-screen"}>
			<h1>Admin Screen</h1>
			<Tabs
				className={classes.tab1}
				TabIndicatorProps={{style: {background:'red'}}}
				onChange={handleTopTab}
				  indicatorColor="secondary"
				  textColor="primary"
				  variant="standard"
				  aria-label="full width tabs example"
				  value={topTabValue}
			>
				<Tab label="Orders" component={Link} to={"/admin/orders"} {...a11yProps(0)}>
						Orders
				</Tab>
				<Tab label="Products"  component={Link} to={"/admin/products"}  {...a11yProps(1)} >
						Products
				</Tab>
				<Tab label="Settings" component={Link} to={"/admin/settings"} {...a11yProps(2)} >
						Settings
				</Tab>
			</Tabs>

			<Switch>
				<Route path="/admin/orders">
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={orderTabValue} onChange={handleOrderTab}
						  className={classes.tab2}
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
					<div title={"Products"} >
						<Box sx={{ width: '100%' }}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								<Tabs
									className={classes.tab2}
									// style={{background: secondaryTabColor}}
									value={productTabValue} onChange={handleProdTab} aria-label="asdfe">
									<Tab label="Products 1" {...a11yProps(0)} />
									<Tab label="Products 2" {...a11yProps(1)} />
								</Tabs>
							</Box>
							<TabPanel value={productTabValue} index={0}>
								<ProductPanel products={props.products1} category={"main"}/>
							</TabPanel>
							<TabPanel value={productTabValue} index={1}>
								<ProductPanel products={props.products2} category={"drinks"}/>
							</TabPanel>
						</Box>
					</div>
				</Route>
				<Route path="/admin/settings">
						<div title={"Settings"}>
							<h3 style={{padding: "25px"}}>
								Marquee on/off :
							</h3>
							<div style={{padding: "25px"}}>
								<input
									style={{padding: "5px"}}
									type="checkbox" />
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
