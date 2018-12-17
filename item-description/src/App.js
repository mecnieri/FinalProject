import React, { Component } from 'react';
import './css/Description.css'
import Description from './components/Description';
import Data from './data/item.json';
import 'bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Description Data={Data} />
      </div>
    );
  }
}

export default App;