import React from 'react';
//TODO change to hashrouter
import {Route, Switch} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import Welcome from "./Home";
import LoginScreen from "./login/LoginScreen";
import Nav from "./Nav";
import {Link, useHistory} from "react-router-dom";
import OrderWizard from "./order/OrderWizardContainer";
import Footer from "./Footer";
import RedirectToLogout from "./login/RedirectToLogout";
import Logout from "./login/Logout";
import AdminScreen from "./admin/AdminScreen";
import {ToastContainer} from "react-toastify";
import Playground from "./Playground";
import {useSelector} from "react-redux";
import {AppState} from "./AppState";

export default function App() {

    let loginToken = useSelector((state: AppState) => state.login.loginToken)
    const history = useHistory();
    if (loginToken && loginToken.token) {
        history.push("/login");
    }

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
                        {loginToken && loginToken.token && <AdminScreen/>}
                    </Route>
                    <Route path="/playground">
                        <Playground/>
                    </Route>


                    {/*this component just redirects to logout2*/}
                    <Route path="/logout">
                        <Nav/>
                        {/*{getMarq()}*/}
                        <RedirectToLogout/>
                        <Footer/>
                    </Route>
                    <Route path="/logout2">
                        <Nav/>
                        {/*{getMarq()}*/}
                        <Logout/>
                        <Footer/>
                    </Route>
                    <Route path="/order">
                        <Nav/>
                        {/*{getMarq()}*/}
                        <OrderWizard />
                        {/*<Footer/>*/}
                    </Route>
                    <Route path="/login">
                        <Nav/>
                        {/*{getMarq()}*/}
                        <LoginScreen/>
                        <Footer/>
                    </Route>
                    <Route path="/">
                        <Nav/>
                        {/*{getMarq()}*/}
                        <Welcome/>
                        <Footer/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}


