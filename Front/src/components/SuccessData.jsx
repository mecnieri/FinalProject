import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class SuccessData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cancel: false,
      redirect: false,
      url: null
    };
  }

  goTo = () => {
    if (this.props.location.state.purchaseStatus) {
      this.setState({ url: "/BoughtProducts" });
    } else {
      this.setState({ url: "/userpanel" });
    }
  };

  render() {
    if (this.state.url) {
      return <Redirect to={this.state.url} />;
    }
    return (
      <div id="id01" ref="id01" style={{ display: "block" }} className="modal">
        <form className="modal-content animate">
          <div className="formContainer">
            <div>
              <h1>{this.props.location.state.message}</h1>
            </div>
          </div>
          <div>
            <button onClick={this.goTo}>OK</button>
          </div>
        </form>
      </div>
    );
  }
}
