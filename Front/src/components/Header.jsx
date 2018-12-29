import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo2.png";
import { Link as LinkFromScroll } from "react-scroll";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
class Header extends Component {
  showSettings(event) {
    event.preventDefault();
  }
  render(props) {
    return (
      <header className="header">
        <ScrollUpButton
          ContainerClassName="ScrollUpButton"
          style={{
            backgroundColor: "#2964c4",
            width: 40,
            height: 40,
            fill: "rgb(255,255,255)"
          }}
          ShowAtPosition={700}
          AnimationDuration={1000}
        />
        <div className="outer-container">
          <div className="menu">
            <label for="toggle" className="burger-label">
              &#9776;
            </label>
            <input type="checkbox" id="toggle" />
            <nav>
              <div className="left">
                <ul>
                  <li className="menu--item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="menu--item">
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </div>
              <div className="right">
                <ul>
                  {!localStorage.getItem("Authorized") && (
                    <li className="menu--item">
                      <Link to="/login">Login</Link>
                    </li>
                  )}

                  {localStorage.getItem("Authorized") &&
                    !localStorage.getItem("Admin") && (
                      <li className="menu--item">
                        <Link to="/userpanel">User Profile</Link>
                      </li>
                    )}
                  {!localStorage.getItem("Authorized") && (
                    <li className="menu--item">
                      <Link to="/signUp">Sign Up</Link>
                    </li>
                  )}
                  {localStorage.getItem("Authorized") &&
                    !localStorage.getItem("Admin") && (
                      <li className="menu--item">
                        <Link to="/checkout">Checkout</Link>
                      </li>
                    )}
                  {localStorage.getItem("Authorized") &&
                    !localStorage.getItem("Admin") && (
                      <li className="menu--item">
                        <Link to="/BoughtProducts">Bought Products</Link>
                      </li>
                    )}
                  {localStorage.getItem("Authorized") &&
                    localStorage.getItem("Admin") && (
                      <li className="menu--item">
                        <Link to="/adminPanel">Admin Panel</Link>
                      </li>
                    )}
                  {!localStorage.getItem("Admin") && (
                    <li className="menu--item">
                      <i className="fas fa-shopping-cart" />
                      <Link to="/cart">Cart</Link>
                    </li>
                  )}

                  {localStorage.getItem("Authorized") && (
                    <li
                      onClick={() => {
                        localStorage.removeItem("Authorized");
                        localStorage.removeItem("Admin");
                      }}
                      className="menu--item"
                    >
                      <Link to="/">Log Out</Link>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div className="middleHeader">
          <div className="logo">
            <img className="logoImg" src={logo} alt="" />
          </div>
          <form className="search" action="" id="searchForm">
            <div className="inputAndAll">
              <input
                className="search-input"
                type="text"
                placeholder="Search for products"
                name="search2"
                id="searchInput"
              />
              <LinkFromScroll
                activeClass="active"
                to="first-row"
                smooth={true}
                duration={300}
                className="scroll-btn"
                onClick={this.props.searchHandler}
              >
                <button type="submit" from="searchForm" className="search-btn">
                  <i className="fa fa-search" />
                </button>
              </LinkFromScroll>
            </div>
          </form>
        </div>
      </header>
    );
  }
}
export default Header;
