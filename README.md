# Let you enjoy your PC media from webpage


> Aim to use reactjs create html files, then use golang to serve.

___

#### How it looks like

![Screen Shot](screenshot/1.png)

___

#### Usage:
1. Download binary file: https://github.com/yingshaoxo/Local_Show/releases/tag/0.2
2. Put it to the folder where your media exists
3. Run it!

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
* integrate with DPlayer
* could update file list and filter non-video files with one red button

___

#### Todo Feature list:

* supprt VR right in browser
* complie with html files, so that all source could be in a single binary file
* supprt raspberry pi arm32 (with docker)

___

#### Based on:

* https://github.com/gin-gonic/gin

___

#### Thanks to:

* https://medium.com/@synapticsynergy/serving-a-react-app-with-golang-using-gin-c6402ee64a4b
* https://fabianlee.org/2018/05/10/docker-packaging-a-golang-version-of-hello-world-in-a-container/
