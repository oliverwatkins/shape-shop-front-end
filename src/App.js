import React from 'react';

import {connect} from 'react-redux';

//TODO change to hashrouter
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";



import Welcome from "./WelcomeScreen";
import AdminScreen from "./AdminScreen";
import LoginScreen from "./login/LoginScreen";
import {createFetchProductsAction} from "./order/redux/productActions";
import MainNav from "./MainNav";

import "./main.scss"

import "./alpenhofCss.scss"

import OrderWizard from "./order/OrderWizard";
import Footer from "./Footer";


class App extends React.PureComponent{
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <MainNav/>
            <Switch>
              <Route path="/admin">
                <AdminScreen/>
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
        </Router>
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
