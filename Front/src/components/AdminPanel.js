import React from 'react';
// import {Redirect } from 'react-router-dom';
import './../user.css';
const FETCHURL = 'http://localhost:5000/api/admin/message';

export default class AdminPanel extends React.Component {

  
  state = {
    username: null,
    email: null,
    balance: null,
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
        })
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
    <div className="co">
        <div className="user-container">
          
          <h2><i className="fas fa-user-tie"></i> Admin Panel</h2>
           {/* <h3><i className="fas fa-shopping-cart"></i>Cart</h3> */}
          <table className="table">
          <tbody>
            <tr>
              <th>User List</th>
              <th>Cart</th>
              <th>Bought Product</th>
              <th>Contact</th>
            </tr>
            <tr>
              <td>{this.state.username}</td>
              <td>{this.state.email}</td>
              <td>{this.state.balance}</td>
              <td className="message"><i className="fas fa-file-signature"></i></td>
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
    