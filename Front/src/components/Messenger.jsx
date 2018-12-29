import React, { Component } from "react";
import user from "../images/user.jpg";
import admin from "../images/admin.png";

class Messenger extends Component {
  render() {
    return (
      <section className="messenger">
        <div className="chatbox">
          <div className="chatlogs">
            <div className="chat chat-user">
              <div className="user-photo">
                <img className="chat-img" src={user} alt="chat" />
              </div>
              <p className="chat-message">Testing 1, 2, 3...</p>
            </div>
            <div className="chat chat-admin">
              <div className="user-photo">
                <img className="chat-img" src={admin} alt="chat" />
              </div>
              <p className="chat-message">Answer 1, 2, 3...</p>
            </div>
          </div>
          <div className="chat-form">
            <textarea className="chat-form--textarea" />
            <button className="chat-form--btn">Send</button>
          </div>
        </div>
      </section>
    );
  }
}

export default Messenger;
