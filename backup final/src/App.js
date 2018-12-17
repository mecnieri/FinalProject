import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';

import 'bootstrap';
import './App.css';
import './user.css';
import './login.css';
import './Header.css';
import './Cart.css';
// import './style.css';
import Data from './db/data.json';
import { IndexPage } from './components/IndexPage';
import { ContactPage } from './components/ContactPage';
import LoginPage from './components/LoginPage';
import Cart from './components/Cart';
import SignupPage from './components/SignupPage';
import UserPanel from './components/UserPanel';
import { ProfilePage } from './components/ProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Slider from './components/Slider';
import Checkout from './components/Checkout';
import './Checkout.css';
import './css/Description.css'
import Description from './components/Description';
import Dat from './data/item.json';

class App extends Component {
  state = {
    showLogin: true
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header showLogin={this.state.showLogin} />
          <Route
            path="/"
            exact
            render={() => (<div><Slider /><IndexPage title={Data.index.title} desc={Data.index.desc} />
            </div>)}
          />
          <Route
            path="/contact"
            render={() => (<ContactPage title={Data.contact.title} desc={Data.contact.desc} />)}
          />
          <Route
            path="/login"
            render={
              () => (
                <LoginPage showLogin={(change) => { this.setState({ showLogin: change }) }} />
              )
            } />
          <Route
            path="/signUp"
            render={
              () => (
                <SignupPage />
              )
            } />
          <Route
            path="/test1"
            render={
              () => (
                <UserPanel />
              )
            } />
          <Route
            path="/cart"
            render={
              () => (
                <Cart />
              )
            } />
          <Route
            path="/checkoutTest"
            render={
              () => (
                <Checkout />
              )
            } />
          <Route
            path="/item"
            render={
              () => (
                <Description Data={Dat} />
              )
            } />

          <ProtectedRoute path="/userpanel" component={UserPanel} />

          {!this.state.showLogin && (<Redirect to={`/userpanel`} />)}

          <Footer />
        </div>
      </Router >
    );
  }
}

export default App;
