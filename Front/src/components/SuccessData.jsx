import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom';

export default class SuccessData extends Component {
    constructor(props){
        super(props);
        this.state={
            cancel:false,
            redirect: false,
            url: null
        }
    }
   
    goTo=()=>{
        if(this.props.location.state.purchaseStatus) {
            this.setState({url: "/BoughtProducts"});
        } else {
            this.setState({url: "/checkoutTest"});
        }
    }

    render() {
        if(this.state.url) {
            return <Redirect to={this.state.url}/>
        } 
        return(
            <div id="id01" ref="id01" style={{display: 'block' }} className="modal">                    
            <form  className="modal-content animate"  >
                <div className="formContainer">
                   <div>{this.props.location.state.message}</div>
                </div>
                <div>
                <button onClick={this.goTo}>
                    OK
                </button>
                </div>
            </form>
        </div>
        )
    }
}