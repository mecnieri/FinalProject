import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import './App.css';
import Data from './db/data.json';
import { IndexPage } from './components/IndexPage';
import { ContactPage } from './components/ContactPage';
import LoginPage from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';

class App extends Component {
  state = {
    showLogin: true
  }

  render() {
    return (
      <Router>
        <div className="App">


          <header>
            <div className="App">
              <div className="top">

                <div className="menu">
                  <ul className="left">


                    <li className="menu--item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="menu--item">
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li className="menu--item">
                      <Link to="/about">About</Link>
                    </li>
                  </ul>

                  <ul className="right">


                    <li className="menu--item">
                      <Link to="/login">Login</Link>
                    </li>


                    <li className="menu--item">
                      <Link to="/signIn">Sign In</Link>
                    </li>

                    <li className="menu--item">
                      <Link to="/profile">My Account</Link>
                    </li>

                    <li className="menu--item">
                      <Link to="/Cart">Cart</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="middleHeader">

                <div class="logo">
                  <img class="logoImg" src="img/5921100ld.jpg" alt="" srcset="" />
                </div>

                <form className="search" action="">
                  <div className="inputAndAll">

                    <input type="text" placeholder="Search for products" name="search2" />
                    <div className="categories">
                      <select className="categoriesClass">
                        <option value="0" selected="selected">All Categories</option>
                        <option value="1">Laptops</option>
                        <option value="2">Mobiles</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>

                <div className="cart">


                  <div className="basket-item-count">
                    {/* <span className="cart-items-count count">0</span> */}
                    <img width="51" height="49" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAxCAYAAAB3aZEhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozRDYwQTgzNTgxMTZFMzExQjJDMUMzMERFMEQ4QzQyMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowOUYzNDgwMEU3MDkxMUUzQUQ3QUY0QTNENkEwQjZEQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowOUYzNDdGRkU3MDkxMUUzQUQ3QUY0QTNENkEwQjZEQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRTA2MjEyOUZDRTZFMzExOTQ5Njg5ODlEOEFEMEQxOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRDYwQTgzNTgxMTZFMzExQjJDMUMzMERFMEQ4QzQyMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj0Gi6AAAAO0SURBVHja3JpriE1RFMf3jMuMkUcIMxhGniNmxqsUyiSTyJfxmJEIeaTkMd5fRgpFPpBEwgc+iJI8GwzJowg34zEegxCmIRp5jpm5/stdN6fT3veec+492zmz6jen1j533/Ofvfdaa+9zk0KhkGgqFqA/wWAwFZc1YCz7PoEqcB1cBLVeFpGXl/dPDGw7WCy5bzl4AfaAneCXl0Ul87Uoyj29wFZwEnTyg5g6C/eOB0dAK6+L2WXxflpTJZ4OALDN4BWYCNqBTJCt+MxSsB+89erIUHw+DIrBBDAMjAOVks+0B5O9PM3M9gOUg1ngp6Q9309iInYb3JL4B4EUv4kRCjHdQA8/iglKfBSe+/lRzCNFHsr1oxgqZ95L/EP8KOYLeCrx0zRL9ZsY1brJAt3/03NTjdjVqZgKiY9GZYBmEc24WrkP7oEDoK1dMQ9AvQfWzQKwjkemA5gDVtsV81JRiw3WKKQ1WKmo5m2JoSDwWOKnadZSk5iZvLcy23O7YgTPU7P15GrAbWsDVkj8VCAfdCImqAgC2RrEzAO9Jf7L4LwTMRTRGiT+HJeF0EJfpmjbxqNjW8wbRndZs4g3i2a7YBwVu2JqFZXAQBcrgXSwROJvBJv46kiM4ESlczuwFnSW+E+DK04rgIjdlfjSQH8XhORwkjRbHY+KiFdMpWI7MCLBQpL4gWXT95hiw2hbDB3ZvpP4p3KGTpTNFuGTIlny3hhv1Ryxb+CGxN+Hi770BAih9bdF0bZDEYT+WsDBl9GR1AyJfwpPt3M8Hb866DvExWMXSdsTET4TF4kUU8YUSNooHyx0IRiQyBIR421EsoOOGzn2V2usmOkE9UyidppmewYKRfhI122rMO5Z3BAjOBDQyeZRcyZOoFF5T0fGn63cHIjzy+jkZjoYDaaBUbwtSOG+7b5jTOLrd16X6437FbfFROwqE6lyO3JlYHeRh7gyr2FsWSDB04J2nb85jDq1NAcjGveaMVpfTpoPeXt9U4Tfkdrpv4g3W1WcGKlsGa57ZHI5bGaYSndKoEPBfAsBYgMolSThAhZ5VsfINBfhV4gZiva5imrBaGMkQownMrt5Dbouhl7Aj7RwqhLNii3Uavk6xGRa6INGrUWMh41lWTrEfLBwDyW8+ijtHy30UaNDzB0hf4lrtBMxAsBxC/+Mch1iqMxfJdQ/Q7kE9sXo4xQ4FKWdzpZf68ozFJYngWsGUdUc5Qot7GsaOHyXGgrXBj48oeCw13It1JR+opUsmpD9EWAAYa+2sbNYLc8AAAAASUVORK5CYII=" /></div>
                  <p>Your balance :</p>
                </div>
              </div>

            </div>

          </header>







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
        </div>
      </Router >
    );
  }
}

export default App;
