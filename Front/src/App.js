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
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
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
import Contact from './components/Contact';
import Dat from './data/item.json';
import Pagination from "../node_modules/react-js-pagination";
import './css/Home-List.css';
import './css/responsive.css';
import './css/Contact.css';

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
  componentDidMount() {
    const FETCHURL = "http://localhost:5000/api/products";
    fetch(FETCHURL)
      .then(res => res.json())
      .then(products => {
        this.setState({ products });
      })
      .catch(err => console.log(err));

    fetch("http://localhost:5000/api/users/getcart", {
      method: 'post',
      headers: new Headers({
        'Authorization': localStorage.getItem("Authorized")
      })
    })
      .then(res => res.json())
      .then(cart => {
        this.setState({ cart });
      })
      .catch(err => console.log(err))


  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber })
  }

  searchHandler = e => {
    e.preventDefault();
    let query;
    if (e.target.tagName === "LI") {
      query = e.target.textContent.slice(0, -1).toLowerCase();
    } else {
      query = e.target.elements.search2.value.toLowerCase();
    }
    let FETCHURL = `http://localhost:5000/api/products/${query}`;
    fetch(FETCHURL)
      .then(res => res.json())
      .then(products => {
        this.setState({ products });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header showLogin={this.state.showLogin} searchHandler={this.searchHandler} adminLog={this.state.adminLog} />
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <Slider />
                <Products products={this.state.products} number={this.state.activePage} />
                <div className="page-turner">
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
            render={() => (<Contact />)}
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
                <SignupPage registered={(change) => { this.setState({ registered: change }) }} />
              )
            } />
          <Route
            path="/admin"
            render={
              () => (
                <AdminLogin adminLog={(change) => { this.setState({ adminLog: change }) }} />
              )
            } />
          <Route
            path="/cart"
            render={
              () => (
                <Cart cart={this.state.cart} />
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
            component={Description}
          />

          <ProtectedRoute path="/userpanel" component={UserPanel} />
          <ProtectedRoute path="/adminpanel" component={AdminPanel} />
          {this.state.registered && (<Redirect to={'/'} />)}

          {!this.state.showLogin && (<Redirect to={`/userpanel`} />)}
          {this.state.adminLog && (<Redirect to={`/adminpanel`} />)}

          <Footer />
        </div>
      </Router >
    );
  }
}

export default App;