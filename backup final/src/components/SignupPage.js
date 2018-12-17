import React from 'react';
// import {Redirect } from 'react-router-dom';
import './../signup.css';

export default class SignupPage extends React.Component {

    constructor(props){
        super(props)
        this.username = React.createRef();
        this.mail=React.createRef();
        this.password = React.createRef();
    }


    render(){
        return(
            <div className="cont">
  
  <form className="reg">
   <h1>Registration Form</h1>
    <div className="row">
      <h4>Account</h4>
      <div className="input-group input-group-icon">
        <input type="text" placeholder="Username" ref="username"  required/>
        <div className="input-icon"><i className="fa fa-user"></i></div>
      </div>
      <div className="input-group input-group-icon">
        <input type="email" placeholder="E-mail" ref="e-mail" required/>
        <div className="input-icon"><i className="fa fa-envelope"></i></div>
      </div>
      <div className="input-group input-group-icon">
        <input type="password" ref="password" placeholder="Password" required/>
        <div className="input-icon"><i className="fa fa-key"></i></div>
      </div>
    </div>
    <div className="row">
      <div className="col-half">
        <h4>Date of Birth</h4>
        <div className="input-group date">
          <div className="col-third">
            <input type="number" ref="day" placeholder="DD" required/>
          </div>
          <div className="col-third">
            <input type="number" ref="month" placeholder="MM" required/>
          </div>
          <div className="col-third">
            <input type="number" ref="year" placeholder="YYYY" required/>
          </div>
        </div>
      </div>
      
    </div>
    <div className="row">
      <h4>Payment Details</h4>
      
      <div className="input-group input-group-icon">
        <input type="text" placeholder="Card Number"/>
        <div className="input-icon"><i className="fas fa-address-card"></i></div>
      </div>
    </div>
    <button type="submit" className="sign-up" >Sign Up</button>
  </form>
</div>
        )
    }

}