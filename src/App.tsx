import React from 'react';

import {connect} from 'react-redux';
//TODO change to hashrouter
import {Route, Switch} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";


import Welcome from "./WelcomeScreen";
import LoginScreen from "./login/LoginScreen";
import {createFetchProductsAction} from "./order/redux/productActions";
import Nav from "./Nav";

// import "./alpenhofCss_.css"

import OrderWizard from "./order/OrderWizardContainer";
import Footer from "./Footer";
import Logout from "./login/Logout";
import {Logout2} from "./login/Logout2";
import AdminScreen from "./admin/AdminScreen";
import {ToastContainer} from "react-toastify";

type Props = {
    fetchProducts: Function
}


class App extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        return (

            <div className="App">
                {/*<Route path="/admin">*/}
                {/*  <AdminScreen/>*/}
                {/*</Route>*/}
                <div>
                    {/*<Nav/>*/}
                    {/*{getMarq()}*/}
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
                            <Logout/>
                            <Footer/>
                        </Route>
                        <Route path="/logout2">
                            <Nav/>
                            {getMarq()}
                            <Logout2/>
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
        fetchProducts: () => {
            dispatch(createFetchProductsAction());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
