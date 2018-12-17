import React from 'react';
import {Redirect } from 'react-router-dom';


export default class LoginPage extends React.Component {

    constructor(props){
        super(props)

        this.OnSubmitHandler = this.OnSubmitHandler.bind(this);
        this.username = React.createRef();
        this.password = React.createRef();
        this.cancel=React.createRef();

        this.state = {
            
            cancel:false
        }
    }
    cancelFunc=()=>{
        this.setState({cancel:true});
    }
    OnSubmitHandler(event){
        event.preventDefault();
        // console.log(this.username.current.value, this.password.current.value);
        this.login(this.username.current.value, this.password.current.value);
    }

    login = (username, password) => {
        fetch('http://localhost:5000/login', {
            method:"POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then( res => res.json() )
        .then( result => {
            if( result.auth ){
                localStorage.setItem('authorized', result.username);
                this.props.showLogin(false);
            }
            else {
                localStorage.removeItem('authorized');
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        const {isLoggedIn} = this.state;
        if( isLoggedIn ){
            return <Redirect to={`/userpanel`} />
        }
        else {
            return (
            
                <div id="id01" ref="id01" style={{display: this.state.cancel ? 'none' : 'block' }} className="modal">                    
                    <form className="modal-content animate" onSubmit={this.OnSubmitHandler} >
                        <div className="imgcontainer">
                            <span  className="close" onClick={this.cancelFunc} title="Close Modal">&times;</span>
                                <img src="./images/user-group-icon.png" alt="Icon" className="avatar"/>
                        </div>
  
                        <div className="formContainer">
                            <label ><b>Username</b></label>
                            <input type="text" placeholder="Enter Username" name="username" ref={this.username} required/>
        
                            <label ><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="password" ref={this.password} required/>
                
                            <button type="submit">Login</button>
                            <button type="button" ref="cancel" className="cancelbtn" 
                            
                            onClick={this.cancelFunc}>Cancel</button>
                        </div>
                    </form>
                </div>
        
        )
               
        }
    }
}