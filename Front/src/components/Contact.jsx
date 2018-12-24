import React, { Component } from 'react';
import Messages from './Messages';
import Input from './Input';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            member: {
                username: 'Vaxo'
            }
        }
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
                />
            </div>
        );
    }
    onSendMessage = (message) => {
        const messages = this.state.messages
        messages.push({
            text: message,
            member: this.state.member
        })
        this.setState({ messages: messages })
    }
}

export default Contact;