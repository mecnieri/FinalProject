import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import './App.css';
import './Header.css'
import Data from './db/data.json';
import { IndexPage } from './components/IndexPage';
import { ContactPage } from './components/ContactPage';
import LoginPage from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';
class App extends Component {
  state = {
    showLogin: true
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route
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

          {!this.state.showLogin && (<Redirect to={`/profile`} />)}
          <Footer />
        </div>
      </Router >
    );
  }
}

export default App;
