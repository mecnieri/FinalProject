import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import './App.css';
import './Header.css';
import './Cart.css';
import Data from './db/data.json';
import { IndexPage } from './components/IndexPage';
import { ContactPage } from './components/ContactPage';
import LoginPage from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css'
import productData from './db/productData.json';

class App extends Component {
  state = {
    showLogin: true
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* <Header /> */}
          {/* <Route
            path="/"
            exact
            render={() => (<IndexPage title={Data.index.title} desc={Data.index.desc} />)}
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
          <ProtectedRoute path="/profile" component={ProfilePage} />

          {!this.state.showLogin && (<Redirect to={`/profile`} />)} */}
          <Cart productData={productData} />
          {/* <Footer /> */}
        </div>
      </Router >
    );
  }
}

export default App;
