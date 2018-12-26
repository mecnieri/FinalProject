import React, { Component } from 'react';
import Messages from './Messages';
import AdminInput from './AdminInput';

class AdminContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            member: {
                username: 'admin'
            },
            username: null,
        }
    }
    handleUserSearch = (e) => {
        e.preventDefault();
        let query;
        query = e.target.children[0].childNodes[1].value;
        let FETCHURL = `http://localhost:5000/api/users/${query}`;
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
                    id: user._id,
                    messages: user.inbox,
                })
            })
            .catch(err => console.log(err))
    }



    render() {
        return (
            <div className="contact-us">
                <div className="App-header">
                    <h1>Contact Admin</h1>
                </div>
                <form onSubmit={this.handleUserSearch} className="search-user-form ">
                    <label className="admin-panel label search-user"><p>Search Username:</p>
                        <input type="text" className="name-input form-control" placeholder="Search for user by name" />
                    </label>
                    <input type="submit" value="Search" className="submit-input btn btn-primary" />
                </form>

                <Messages
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <AdminInput
                    onSendMessage={this.onSendMessage}
                    handleSaveInBaseAdmin={this.handleSaveInBaseAdmin}
                />
            </div>
        );
    }
    onSendMessage = (message) => {
        const messages = this.state.messages
        messages.push({
            letter: message,
            sender: this.state.member.username
        })
        this.setState({ messages: messages })
    }
    handleSaveInBaseAdmin = () => {
        console.log(73, "Contact", this.state.messages)

        let FETCHURL = `http://localhost:5000/api/admin/message`;
        fetch(FETCHURL, {
            method: 'post',
            headers: new Headers({
                'Authorization': localStorage.getItem("Authorized"),
                Accept: "application/json",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ inbox: this.state.messages, username: this.state.username })
        })
            .catch(err => console.log(err))
        console.log(86, "Contact", this.state.username)

    }
}

export default AdminContact;