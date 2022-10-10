import React, {useEffect} from 'react';

import {connect, useDispatch} from 'react-redux';
//TODO change to hashrouter
import {Route, Switch} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";


import Welcome from "./WelcomeScreen";
import LoginScreen from "./login/LoginScreen";
import {
    createFetchProductsSuccessAction
} from "./admin/redux/productActions";
import Nav from "./Nav";


import OrderWizard from "./order/OrderWizardContainer";
import Footer from "./Footer";
import RedirectToLogout from "./login/RedirectToLogout";
import Logout from "./login/Logout";
import AdminScreen from "./admin/AdminScreen";
import {ToastContainer} from "react-toastify";
import {useAsync} from "react-async-hook";
import {OrderState} from "./AppState";
import {api} from "./api/api";

type Props = {
    fetchProducts: Function
}


function App(props: Props) {
    let dispatch = useDispatch();

    const {
        loading: productLoading,
        error: productError,
        result: products = null,
    } = useAsync<OrderState[]>(api.fetchProducts, []);

    useEffect(() => {
        if (products) {
            dispatch(createFetchProductsSuccessAction(products));
        }
    }, [products]);



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
                        <OrderWizard/>
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

const mapStateToProps = (state: any) => {
    return {
        login: state.login,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        // fetchProducts: () => {
        //     dispatch(createFetchProductsSuccessAction());
        // },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
