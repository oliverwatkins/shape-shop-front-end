import React from 'react';

import {connect} from 'react-redux';
//TODO change to hashrouter
import {Route, Switch} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";


import Welcome from "./WelcomeScreen";
import LoginScreen from "./login/LoginScreen";
import {createFetchProductsAction} from "./order/redux/productActions";
import Nav from "./Nav";

// import "./main.scss"

import "./alpenhofCss.scss"

import OrderWizard from "./order/OrderWizardContainer";
import Footer from "./Footer";
import Logout from "./login/Logout";
import {Logout2} from "./login/Logout2";
import AdminScreen from "./admin/AdminScreen";
import {ToastContainer} from "react-toastify";

type Props = {
  fetchProducts: Function
}

class App extends React.PureComponent<Props>{
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (

      <div className="App">
          <div>
            <Nav/>
            <div className={"marquee"} >
              <p>-- Wir haben ab 30. Mai 2020 geöffnet, ab 5. Juni 2020 sind Hochzeiten wieder möglich! -- </p>
            </div>
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
        <Footer/>
      </div>
  );
  }
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
