import { Component } from 'react'
import './App.css'

import { dict } from "./store"

class App extends Component {
  render() {
      return (
        <div className="App">
          <div>{ dict.hi }</div>

          <br/>

          <button onClick={() => {
            dict.hi = 'yingshaoxo is nice';
            this.setState({});
          }
          }>click me to change</button>
        </div>
      )
  }
}

export default App
