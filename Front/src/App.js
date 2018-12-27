import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Link as LinkFromScroll } from 'react-scroll';
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import { slide as Menu } from 'react-burger-menu'
import "bootstrap";
import "./App.css";
// import './user.css';
import "./login.css";
import "./Header.css";
import "./Cart.css";
// import './style.css';
import Products from "./components/Products";
// import { Product } from './components/Product';
import LoginPage from "./components/LoginPage";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import Cart from "./components/Cart";
import SignupPage from "./components/SignupPage";
import UserPanel from "./components/UserPanel";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import Checkout from "./components/Checkout";
import "./Checkout.css";
import "./css/Description.css";
import Description from "./components/Description";
import AdminDescription from "./components/AdminDescription";
import Pagination from "../node_modules/react-js-pagination";
import "./css/Home-List.css";
import "./css/responsive.css";
import "./css/Contact.css";
import "./css/Admin-Panel.css";
import "./css/AdminProducts.css";
import Contact from "./components/Contact";
import SuccessData from "./components/SuccessData";
import BoughtProduct from "./components/BoughtProduct";
import BoughtProducts from "./components/BoughtProducts";
import BoughtWrapper from "./components/BoughtWrapper";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true,
      products: null,
      activePage: 1,
      adminLog: false,
      registered: false,
      tg:'LI',
      text: ''
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    const FETCHURL = "http://localhost:5000/api/products";
    fetch(FETCHURL)
      .then(res => res.json())
      .then(products => {
        this.setState({ products });
      })
      .catch(err => console.log(err));
    //mergevaxo - მგონი მე წავშალე და არაა საჭირო
    //   fetch("http://localhost:5000/api/users/getcart", {
    //   method: 'post',
    //   headers: new Headers({
    //     'Authorization': localStorage.getItem("Authorized")
    //   })
    // })
    //   .then(res => res.json())
    //   .then(cart => {
    //     this.setState({ cart });
    //   })
    //   .catch(err => console.log(err))
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  searchHandler = e => {
    e.preventDefault();
    console.log(83, e.target[0].value);
    let query;
    this.setState({text: e.target[0].value},()=>{
      console.log(this.state.text)
      console.log(this.state.tg)
      console.log(e.target);
      if(this.state.tg=="LI") {
        console.log(88, this.state.tg);
        console.log(89, this.state.text);
        query = this.state.text.slice(0, -1).toLowerCase();
       } else {
        query = this.state.text.elements.search2.value.toLowerCase();
       }
       console.log(96, query)
       let FETCHURL = `http://localhost:5000/api/products/${query}`;
         fetch(FETCHURL)
         .then(res => res.json())
         .then(products => {
          this.setState({ products });
         })
         .catch(err => console.log(err));
    });
   }

  render() {
    return (
      <Router>
        <div className="App">
          <Header
            showLogin={this.state.showLogin}
            searchHandler={this.searchHandler}
            adminLog={this.state.adminLog}
          />
          <div className="nav-bar">
                <div className="nav-bar_container">
                    <ul className="nav-bar_container--list">
                    <LinkFromScroll activeClass="active" to="first-row"
                                smooth={true}
                                duration={500}
                    >
                    <li onClick={this.searchHandler}><Link to="Laptops"
                    style={{color:'#fff',textDecoration:'none'}}>Laptops</Link></li>
                    </LinkFromScroll>
                    <LinkFromScroll activeClass="active" to="first-row"
                                smooth={true}
                                duration={500}
                            >
                    <li onClick={this.searchHandler}><Link to="Mobiles" 
                    style={{color:'#fff',textDecoration:'none'}}>Mobiles</Link></li>
                    </LinkFromScroll>
                    <LinkFromScroll activeClass="active" to="first-row"
                                smooth={true}
                                duration={500}
                    >
                    <li onClick={this.searchHandler}><Link to="Tablets" 
                    style={{color:'#fff',textDecoration:'none'}}>Tablets</Link></li>
                    </LinkFromScroll>
                    <LinkFromScroll activeClass="active" to="first-row"
                                smooth={true}
                                duration={500}
                    >
                    <li onClick={this.searchHandler}><Link to="Cameras" 
                    style={{color:'#fff',textDecoration:'none'}}>Cameras</Link></li>
                    </LinkFromScroll>
                    <LinkFromScroll activeClass="active" to="first-row"
                                smooth={true}
                                duration={500}
                            >
                    <li onClick={this.searchHandler}><Link to="Consoles" 
                    style={{color:'#fff',textDecoration:'none'}}>Consoles</Link></li>
                    </LinkFromScroll>
                    <LinkFromScroll activeClass="active" to="first-row"
                                smooth={true}
                                duration={500}
                            >
                   <li onClick={this.searchHandler}><Link to="TVs" 
                   style={{color:'#fff', textDecoration:'none'}}>TVs</Link></li>
                   </LinkFromScroll>
                    </ul>
                </div>
            </div>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <Slider />
                <Products
                  products={this.state.products}
                  number={this.state.activePage}
                />
                <div className="page-turner">
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </div>
              </div>
            )}
          />
          {/* <Route
            path="/contact"
            render={() => (<Contact />)}
          /> */}
          {/* <Route
            path="/contactAdmin"
            render={() => (<AdminContact />)}
          /> */}
          <Route
            path="/login"
            render={() => (
              <LoginPage
                showLogin={change => {
                  this.setState({ showLogin: change });
                }}
              />
            )}
          />
          <Route
            path="/signUp"
            render={() => (
              <SignupPage
                registered={change => {
                  this.setState({ registered: change });
                }}
              />
            )}
          />
          <Route
            path="/admin"
            render={() => (
              <AdminLogin
                adminLog={change => {
                  this.setState({ adminLog: change });
                }}
              />
            )}
          />
          <Route
            path="/cart"
            render={props => (
              // change
              <Cart {...props} cart={this.state.cart} />
            )}
          />
          <Route path="/checkoutTest" render={() => <Checkout />} />
          {/* change */}
          {/* appshi chaamate es  */}
          <Route
            path="/Laptops"
            render={
              () => (
                <Products products={this.state.products} number={this.state.activePage} />
              )
            }/>
             <Route
            path="/Mobiles"
            render={
              () => (
                <Products products={this.state.products} number={this.state.activePage} />
              )
            }/>
             <Route
            path="/Tablets"
            render={
              () => (
                <Products products={this.state.products} number={this.state.activePage} />
              )
            }/>
             <Route
            path="/Cameras"
            render={
              () => (
                <Products products={this.state.products} number={this.state.activePage} />
              )
            }/>
             <Route
            path="/Consoles"
            render={
              () => (
                <Products products={this.state.products} number={this.state.activePage} />
              )
            }/>
             <Route
            path="/TVs"
            render={
              () => (
                <Products products={this.state.products} number={this.state.activePage} />
              )
            }/>
          <Route
            path="/successdata"
            render={props => <SuccessData {...props} />}
          />

          <Route
            path="/BoughtProducts/"
            component={BoughtProducts}
            // render={
            //   () => (
            //     <BoughtProduct/>
            //   )
            // }
          />

          {/* aqamde */}
          <Route
            path="/item"
            render={props => (
              // <Description {...props} handleStateChange={this.handleStateChange}/>
              <Description {...props} />
            )}
          />
          <Route path="/itemAdmin" component={AdminDescription} />

          <ProtectedRoute path="/userpanel" component={UserPanel} />
          <ProtectedRoute path="/adminpanel" component={AdminPanel} />
          {this.state.registered && <Redirect to={"/"} />}

          {!this.state.showLogin && <Redirect to={`/`} />}
          {this.state.adminLog && <Redirect to={`/adminpanel`} />}

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
