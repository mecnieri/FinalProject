import React from 'react';
import Contact from './Contact';
// import {Redirect } from 'react-router-dom';
import './../user.css';
import { CLIENT_RENEG_LIMIT } from 'tls';
const FETCHURL = 'http://localhost:5000/api/users/current';

export default class UserPanel extends React.Component {

  //constructor(props){

  // super(props)
  // this.username = React.createRef();
  // this.mail=React.createRef();
  // this.password = React.createRef();
  //}
  state = {
    username: null,
    email: null,
    balance: null,
    age: null,
    birthday: null
  }
  componentDidMount() {
    fetch(FETCHURL, {
      method: 'get',
      headers: new Headers({
        'Authorization': localStorage.getItem("Authorized")
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
        })
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="co">
        <div className="user-container">
        {console.log(49, Date.parse(this.state.birthday))}
          <h2><i className="fas fa-user fa-2x"></i> User Details</h2>
          {/* <h3><i className="fas fa-shopping-cart fa-2x"></i>Cart</h3> */}
          <table className="table table-hover user-table">
            <tbody>
              <tr>
                <th>Username</th>
                <th>E-Mail</th>
                <th>Birth Date</th>
                <th>Enter amount of Balance</th>
              </tr>

              <tr>
                <td>{this.state.username}</td>
                <td>{this.state.email}</td>
                <td>{this.state.birthday && this.state.birthday.substr(0, 10)}</td>
                <td>{this.state.balance}</td>
              </tr>
            </tbody>

          </table>
          <Contact />
          {/* მისაწერი აქვე არ სჭირდება. მაგისთვის ცალკე კონტაქტია გაკეთებული. ვახო */}
          {/* <form className="textarea">
            <textarea></textarea>
            <button className="btn btn-success">Send Message</button>
          </form> */}

        </div>
      </div>
    )
  }

}