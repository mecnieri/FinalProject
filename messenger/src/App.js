import React, { Component } from 'react';
import Messenger from './components/Messenger';
import './css/Messenger.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Messenger />
      </div>
    );
  }
}

export default App;
