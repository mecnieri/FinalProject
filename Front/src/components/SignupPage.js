import React from 'react';
// import {Redirect } from 'react-router-dom';
import './../signup.css';

export default class SignupPage extends React.Component {

    constructor(props){
        super(props);
        this.OnSubmitHandler = this.OnSubmitHandler.bind(this);
        this.username = React.createRef();
        this.email=React.createRef();    
        this.password = React.createRef();
        this.password2=React.createRef();
        this.birthday=React.createRef();
        this.balance=React.createRef();
     
         
    }
    OnSubmitHandler(event){
      event.preventDefault();
      if(this.password.current.value!==this.password2.current.value){
      }
      else{
      this.login(this.username.current.value,this.email.current.value,this.password.current.value,
                 this.password2.current.value, this.birthday.current.value,this.balance.current.value);
      }
  }

  login = (username, email, password,password2,birthday,balance) => {
      fetch('http://localhost:5000/api/users/register', {
          method:"POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({username, email, password,password2,birthday,balance})
      })
      .then( res => res.json() )
      .then( result => {
        localStorage.setItem('Registered', result.token);
        this.props.registered(true);
      })
      .catch(err => console.log(err))
  }


    render(){
     
        return(
            <div className="cont">
  
  <form onSubmit={this.OnSubmitHandler}>
   <h1>Registration Form</h1>
    <div className="row">
      <h4>Account</h4>
      <div className="input-group input-group-icon">
        <input type="text" placeholder="Username" ref={this.username}  required/>
        <div className="input-icon"><i className="fa fa-user"></i></div>
      </div>
      <div className="input-group input-group-icon">
        <input type="email" placeholder="E-mail" ref={this.email} required/>
        <div className="input-icon"><i className="fa fa-envelope"></i></div>
      </div>
      <div className="input-group input-group-icon">
        <input type="password" ref={this.password} placeholder="Password (6 char at least)" required/>
        <div className="input-icon"><i className="fa fa-key"></i></div>
      </div>
      <div className="input-group input-group-icon">
        <input type="password" ref={this.password2} placeholder="Confirm Password" required/>
        <div className="input-icon"><i className="fa fa-key"></i></div>
      </div>
    </div>
    <div className="row">
      <div className="col-half">
        <h4>Date of Birth</h4>
        <div className="inp">
          <div className="inp1">
            <input type="date" ref={this.birthday} required/>
          </div>
        </div>
      </div>
      
    </div>
    <div className="row">
      <h4>Payment Details</h4>
      
      <div className="input-group input-group-icon">
        <input type="number" placeholder="Enter amount of Balance" ref={this.balance}/>
        <div className="input-icon"><i className="fas fa-address-card"></i></div>
      </div>
    </div>
    <button type="submit" className="sign-up" >Sign Up</button>
  </form>
</div>
        )
      
    }

}