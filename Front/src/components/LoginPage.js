import React from 'react';
import { Redirect, Link } from 'react-router-dom';


export default class LoginPage extends React.Component {

    constructor(props) {
        super(props)

        this.OnSubmitHandler = this.OnSubmitHandler.bind(this);
        this.email = React.createRef();
        this.password = React.createRef();
        this.cancel = React.createRef();

        this.state = {

            cancel: false
        }
    }
    cancelFunc = () => {
        this.setState({ cancel: true });
    }
    goTo = () => {
        return <Redirect to="/" />;
    }
    OnSubmitHandler(event) {
        event.preventDefault();
        // console.log(this.email.current.value, this.password.current.value);
        this.login(this.email.current.value, this.password.current.value);
    }

    login = (email, password) => {
        fetch('http://localhost:5000/api/users/login', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    localStorage.setItem('Authorized', result.token);
                    this.props.showLogin(false);
                    this.setState({cancel:true});
                }
                else {
                    localStorage.removeItem('Authorized');
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        const { isLoggedIn } = this.state;
        if (isLoggedIn) {
            return <Redirect to={`/`} />
        }
        else {
            return (

                <div id="id01" ref="id01" style={{ display: this.state.cancel ? 'none' : 'block' }} className="modal">
                    <form className="modal-content animate login-page" onSubmit={this.OnSubmitHandler} >
                        <div className="imgcontainer">
                            <span className="close" onClick={this.goTo} title="Close Modal">
                                <Link to="/">&times;</Link></span>
                            <img src="./images/user.png" alt="Icon" className="avatar" />
                        </div>

                        <div className="formContainer">
                            <label ><b>Mail</b></label>
                            <input type="text" placeholder="Enter email" name="email" ref={this.email} required />

                            <label ><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="password" ref={this.password} required />

                            <button type="submit" className="btn btn-primary submitBtn">Login</button>
                            <button type="button" ref="cancel" className="cancelbtn btn btn-primary"

                                onClick={this.goTo}>
                                <Link style={{ color: '#fff', textDecoration: 'none' }} to="/">Cancel</Link></button>
                        </div>
                    </form>
                </div>

            )

        }
    }
}