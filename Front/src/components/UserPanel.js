import React from "react";
import Contact from "./Contact";
import "./../css/user.css";
const FETCHURL = "http://localhost:5000/api/users/current";

export default class UserPanel extends React.Component {
  state = {
    username: null,
    email: null,
    balance: null,
    age: null,
    birthday: null
  };
  componentDidMount() {
    fetch(FETCHURL, {
      method: "get",
      headers: new Headers({
        Authorization: localStorage.getItem("Authorized")
      })
    })
      .then(res => res.json())
      .then(user => {
        this.setState({
          username: user.username,
          email: user.email,
          balance: user.balance,
          age: user.age,
          birthday: user.birthday
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="co">
        <div className="user-container">
          <h2>
            <i className="fas fa-user fa-2x" /> User Details
          </h2>
          <table className="table table-hover user-table">
            <tbody>
              <tr>
                <th>Username</th>
                <th>E-Mail</th>
                <th>Birth Date</th>
                <th>Balance</th>
              </tr>

              <tr>
                <td>{this.state.username}</td>
                <td>{this.state.email}</td>
                <td>
                  {this.state.birthday && this.state.birthday.substr(0, 10)}
                </td>
                <td>{this.state.balance && this.state.balance.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <Contact />
        </div>
      </div>
    );
  }
}
