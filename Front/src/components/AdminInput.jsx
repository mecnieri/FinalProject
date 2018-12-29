import React, { Component } from 'react';
import 'bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }
    onChangeAdmin(e) {
        this.setState({ text: e.target.value });
    }
    onSubmitAdmin(e) {
        e.preventDefault();
        this.setState({ text: "" });
        this.props.onSendMessage(this.state.text);
        this.props.handleSaveInBaseAdmin()

    }

    render() {
        return (
            <div className="input">
                <form onSubmit={e => this.onSubmitAdmin(e)}>
                    <textarea className="message-input"
                        onChange={e => this.onChangeAdmin(e)}
                        value={this.state.text}
                        type="text"
                        placeholder="Enter your message and press ENTER"
                        autoFocus={true}
                    />
                    <button className="btn btn-primary btn-send">Send</button>
                </form>
            </div>
        );
    }
}

export default Input;