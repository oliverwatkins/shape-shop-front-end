import React, {useEffect} from 'react';

import {connect, useDispatch} from 'react-redux';
//TODO change to hashrouter
import {Route, Switch} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";


import Welcome from "./WelcomeScreen";
import LoginScreen from "./login/LoginScreen";
import {
    fetchProductsSuccessAction
} from "./admin/redux/productsReducer";
import Nav from "./Nav";


import OrderWizard from "./order/OrderWizardContainer";
import Footer from "./Footer";
import RedirectToLogout from "./login/RedirectToLogout";
import Logout from "./login/Logout";
import AdminScreen from "./admin/AdminScreen";
import {ToastContainer} from "react-toastify";
import {useAsync} from "react-async-hook";
import {AppState, OrderState, Product} from "./AppState";
import {api} from "./api/api";

// type Props = {
//     fetchProducts: Function
// }

export default function App() {
    let dispatch = useDispatch();

    // const {
    //     loading: productLoading,
    //     error: productError,
    //     result: products = null,
    // } = useAsync<Product[]>(api.fetchProducts, []);
    //
    // useEffect(() => {
    //     if (products) {
    //         dispatch(fetchProductsSuccessAction({data: products}));
    //     }
    // }, [products]);

    return (
        <div className="App">
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Switch>
                    <Route path="/admin">
                        <AdminScreen/>
                    </Route>

                    {/*this component just redirects to logout2*/}
                    <Route path="/logout">
                        <Nav/>
                        {getMarq()}
                        <RedirectToLogout/>
                        <Footer/>
                    </Route>
                    <Route path="/logout2">
                        <Nav/>
                        {getMarq()}
                        <Logout/>
                        <Footer/>
                    </Route>
                    <Route path="/order">
                        <Nav/>
                        {getMarq()}
                        <OrderWizard />
                        <Footer/>
                    </Route>
                    <Route path="/login">
                        <Nav/>
                        {getMarq()}
                        <LoginScreen/>
                        <Footer/>
                    </Route>
                    <Route path="/">
                        <Nav/>
                        {getMarq()}
                        <Welcome/>
                        <Footer/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

function getMarq() {
    return <div className={"marquee"}>
        <p>-- Wir haben ab 30. Mai 2020 geöffnet, ab 5. Juni 2020 sind Hochzeiten wieder möglich! -- </p>
    </div>;
}
