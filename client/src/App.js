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
          <p style={{color:'grey'}}><small><small>
              Made by <a href="https://github.com/yingshaoxo" target="_blank" style={{color:'red'}}>yingshaoxo</a>
          </small></small></p>
      </div>
    );
  }
}

export default App;
