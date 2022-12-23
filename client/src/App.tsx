import { useState } from 'react'

import List from './components/List'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className='list_view'>
        <List></List>
      </div>

      <div className='footer'>
        <p style={{color:'grey'}}><small><small>
            Made by <a href="https://yingshaoxo.xyz" target="_blank" style={{color:'red'}}>yingshaoxo</a>
        </small></small></p>
      </div>
    </div>
  )
}

export default App
