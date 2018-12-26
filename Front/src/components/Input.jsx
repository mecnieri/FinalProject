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
    onChange(e) {
        this.setState({ text: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({ text: "" });
        this.props.onSendMessage(this.state.text);
        this.props.handleSaveInBase()
    }
   
    render() {
        return (
            <div className="input">
                <form onSubmit={e => this.onSubmit(e)}>
                    <input
                        onChange={e => this.onChange(e)}
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