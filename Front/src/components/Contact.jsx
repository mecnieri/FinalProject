import React, { Component } from "react";
import Messages from "./Messages";
import Input from "./Input";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      member: {
        username: null
      }
    };
  }
  tick() {
    let FETCHURL = `http://localhost:5000/api/users/current`;
    fetch(FETCHURL, {
      method: "get",
      headers: new Headers({
        Authorization: localStorage.getItem("Authorized")
      })
    })
      .then(res => res.json())
      .then(user => {
        this.setState({
          messages: user.inbox,
          member: { username: user.username }
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className="contact-us">
        <div className="App-header">
          <h1>Contact Admin</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
          handleSaveInBase={this.handleSaveInBase}
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
  handleSaveInBase = () => {
    let FETCHURL = `http://localhost:5000/api/users/message`;
    fetch(FETCHURL, {
      method: "post",
      headers: new Headers({
        Authorization: localStorage.getItem("Authorized"),
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ inbox: this.state.messages })
    }).catch(err => console.log(err));
  };
}

export default Contact;
