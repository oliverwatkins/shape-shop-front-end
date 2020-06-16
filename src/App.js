import React from 'react';

import {connect} from 'react-redux';
//TODO change to hashrouter
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


import Welcome from "./WelcomeScreen";
import LoginScreen from "./login/LoginScreen";
import {createFetchProductsAction} from "./order/redux/productActions";
import Nav from "./Nav";

import "./main.scss"

import "./alpenhofCss.scss"

import OrderWizard from "./order/OrderWizard";
import Footer from "./Footer";
import Logout from "./login/Logout";
import {Logout2} from "./login/Logout2";
import AdminScreen from "./admin/AdminScreen";


class App extends React.PureComponent{
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div className="App">
          <div>
            <Nav/>
            <Switch>
              <Route path="/admin">
                <AdminScreen/>
              </Route>

              {/*this component just redirects to logout2*/}
              <Route path="/logout" component={Logout}/>

              <Route path="/logout2">
                <Logout2/>
              </Route>
              <Route path="/order">
                <OrderWizard/>
              </Route>
              <Route path="/login">
                <LoginScreen/>
              </Route>
              <Route path="/">
                <Welcome/>
              </Route>
            </Switch>
          </div>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = dispatch => {
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
