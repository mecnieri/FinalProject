import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';

import 'bootstrap';
import './App.css';
// import './user.css';
import './login.css';
import './Header.css';
import './Cart.css';
// import './style.css';
import Data from './db/data.json';
import Products from './components/Products';
// import { Product } from './components/Product';
import { ContactPage } from './components/ContactPage';
import LoginPage from './components/LoginPage';
import Cart from './components/Cart';
import SignupPage from './components/SignupPage';
import UserPanel from './components/UserPanel';
import Header from './components/Header';
import Footer from './components/Footer';
import Slider from './components/Slider';
import Checkout from './components/Checkout';
import './Checkout.css';
import './css/Description.css'
import Description from './components/Description';
import Dat from './data/item.json';
import Pagination from "../node_modules/react-js-pagination";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLogin: true,
      products: null,
      activePage: 1
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber })
  }

  searchHandler = (e) => {
    e.preventDefault();
    let query = e.target.elements.search2.value;
    let FETCHURL = `http://localhost:5000/api/products/${query}`;
    fetch(FETCHURL)
      .then(res => res.json())
      .then(products => {
        this.setState({ products });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header showLogin={this.state.showLogin} searchHandler={this.searchHandler} />
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <Slider />
                <Products products={this.state.products} number={this.state.activePage} />
                <div>
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </div>
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