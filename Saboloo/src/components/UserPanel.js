import React from 'react';
// import {Redirect } from 'react-router-dom';
import './../user.css';
const FETCHURL = 'http://localhost:5000/api/users/current';

export default class UserPanel extends React.Component {

  //constructor(props){

  // super(props)
  // this.username = React.createRef();
  // this.mail=React.createRef();
  // this.password = React.createRef();
  //}
  state = {
    jsonData: null,
    showSpinner: true
  }
  componentDidMount() {
    console.log("componentDidMount");
    fetch(FETCHURL, {
      method: 'get',
      headers: new Headers({
        'Authorization': localStorage.getItem("Authorized")
      })
    })
      .then(res => res.json())
      .then(users => {
        // setTimeout(() => {
        console.log(30, users);
        this.setState({ jsonData: users.username, showSpinner: false })
        // }, 3000)
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="co">
        <div className="user-container">

          <h2><i className="fas fa-user fa-2x"></i> User Details</h2>
          <h3><i className="fas fa-shopping-cart fa-2x"></i>Cart</h3>
          <table className="table">
            <tbody>
              <tr>
                <th>Username</th>
                <th>E-Mail</th>
                <th>Birth Date</th>
                <th>Balance</th>
              </tr>

              <tr>
                <td>{this.state.jsonData}</td>
                <td>mjananashvili97@gmail.com</td>
                <td>20/01/1997</td>
                <td>2500$</td>
              </tr>
            </tbody>

          </table>


          <form className="textarea">
            <textarea></textarea>
            <button className="btn btn-success">Send Message</button>
          </form>

        </div>
      </div>
    )
  }

}