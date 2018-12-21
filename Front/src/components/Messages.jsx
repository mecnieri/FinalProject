import React, { Component } from 'react';
import admin from '../images/admin.png'

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
        const { member, text } = message;
        const { currentMember } = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";
        return (
            <li className={className}>
                <img src={admin} alt="admin" className="avatar" />
                <div className="Message-content">
                    <div className="username">
                        {member.username}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li >
        );
    }
}

export default Messages;