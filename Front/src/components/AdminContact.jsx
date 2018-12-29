import React, { Component } from "react";
import Messages from "./Messages";
import AdminInput from "./AdminInput";

class AdminContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      member: {
        username: "admin"
      },
      username: null,
      query: null,
      notification: []
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  tick() {
    let FETCHURL2 = `http://localhost:5000/api/admin`;
    fetch(FETCHURL2, {
      method: "get",
      headers: new Headers({
        Authorization: localStorage.getItem("Authorized")
      })
    })
      .then(res => res.json())
      .then(notificatonArray => {
        this.setState({
          notification: notificatonArray
        });
      })
      .catch(err => console.log(err));
    let FETCHURL = `http://localhost:5000/api/users/${this.state.query}`;
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
          id: user._id,
          messages: user.inbox
        });
      })
      .catch(err => console.log(err));
  }
  handleUserSearch = e => {
    e.preventDefault();
    let query;
    if (e.target.nodeName === "BUTTON") {
      query = e.target.innerHTML;
      this.setState({ query: query });
      fetch("http://localhost:5000/api/admin/notifications", {
        method: "put",
        headers: new Headers({
          Authorization: localStorage.getItem("Authorized"),
          Accept: "application/json",
        "Content-Type": "application/json"
        }),
        body: JSON.stringify({sender: query})
      })
    } else {
      this.setState({ query: e.target.children[0].childNodes[1].value });
      query = e.target.children[0].childNodes[1].value;
    }
    let FETCHURL = `http://localhost:5000/api/users/${query}`;
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
          id: user._id,
          messages: user.inbox
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="contact-us">
        <div className="App-header">
          <h1>Contact User</h1>
        </div>
        <form onSubmit={this.handleUserSearch} className="search-user-form ">
          <label className="admin-panel label search-user">
            <p>Search Username:</p>
            <input
              type="text"
              className="name-input form-control"
              placeholder="Search for user by name"
            />
          </label>
          <input
            type="submit"
            value="Search"
            className="submit-input btn btn-primary"
          />
        </form>
        <h1>
          {this.state.notification.map(notif => (
            <button onClick={this.handleUserSearch} className="btn btn-primary">{notif.from}</button>
          ))}
        </h1>
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
  onSendMessage = message => {
    const messages = this.state.messages;
    messages.push({
      letter: message,
      sender: this.state.member.username
    });
    this.setState({ messages: messages });
  };
  handleSaveInBaseAdmin = () => {

    let FETCHURL = `http://localhost:5000/api/admin/message`;
    fetch(FETCHURL, {
      method: "post",
      headers: new Headers({
        Authorization: localStorage.getItem("Authorized"),
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        inbox: this.state.messages,
        username: this.state.username
      })
    }).catch(err => console.log(err));
  };
}

export default AdminContact;
