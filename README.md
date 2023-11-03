# Let you enjoy your PC media from webpage


> Aim to use reactjs to generate html files, then use golang to serve it.

___

#### How it looks like

![Screen Shot](screenshot/1.png)

___

#### Usage:
1. Download the binary file: https://github.com/yingshaoxo/Local_Show/releases/tag/0.7
2. Put it at the folder where your media exists
3. Run it!

> Or `./LocalShow_linux_amd64 "/home/**/Vides/"`

> Or use docker-compose: https://hub.docker.com/repository/docker/yingshaoxo/local_show

> You could even get the raw html file served under http://0.0.0.0:5012/raw or http://0.0.0.0:5012/html

___

#### Complie:
Have `yarn` and `golang` installed first.

```
./Tools.sh build
```
___

#### Finished Feature list:

* Golang restful api for getting file_name and static url
* reactjs show files in a list (categorized by folder name)
* integrate with ReactPlayer
* could update file list and filter non-video files with one button
* could remember the last selection

___

#### Todo Feature list:

* supprt VR right in browser

___

#### Based on:

* https://github.com/gin-gonic/gin
* https://github.com/gin-contrib/cors
* https://github.com/gin-gonic/contrib/static
* https://github.com/mitchellh/gox

___

#### Thanks to:

* https://medium.com/@synapticsynergy/serving-a-react-app-with-golang-using-gin-c6402ee64a4b
* https://fabianlee.org/2018/05/10/docker-packaging-a-golang-version-of-hello-world-in-a-container/

#### Think about react.js

##### You could use `@vue/reactivity` or `vue(2.7)` to set up a global store to save every variable and function you need cross your whole projct (how to set up a react.js global variable and functions dict)
```ts
#store.ts

import { reactive } from '@vue/reactivity'
//import { reactive } from 'vue'; //import from vue2.7 to support IE11

export const dict = reactive({
    hi: "yingshaoxo"
})

export const functions = reactive({
})
```

```tsx
import { useState, Component } from 'react'
import { dict } from "./store"

class App extends Component {
  render() {
      return (
        <div className="App">
          <div>{ dict.hi }</div>

          <button onClick={() => {
            dict.hi = 'is nice';
            this.setState({});
          }
          }>click me to change</button>
        </div>
      )
  }
}

export default App
```

> It will not support IE11 because they do not have Proxy API. If you want to let ie to support vue reactive function, you have to import and use vue2.7 version of reactive function.
