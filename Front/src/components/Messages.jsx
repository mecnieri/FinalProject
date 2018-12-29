import React, { Component } from "react";
import admin from "../images/admin.png";

class Messages extends Component {
  render() {
    const { messages } = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const { letter } = message;
    const { currentMember } = this.props;
    const messageFromMe = message.sender === currentMember.username;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    return (
      <li className={className}>
        <img src={admin} alt="admin" className="avatar" />
        <div className="Message-content">
          <div className="username">{message.sender}</div>
          <div className="text">{letter}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
