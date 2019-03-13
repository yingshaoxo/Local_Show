import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NestedList from './List';


class App extends Component {
  render() {
    return (
      <div className="App">
          <NestedList
          >
          </NestedList>
      </div>
    );
  }
}

export default App;
