# Let you enjoy your PC media from webpage


> Aim to use reactjs create html files, then use golang to serve.

___

#### Complie:
```
./Tools.sh build
```

#### Usage:

```
sudo docker-compose up -d
```

or

```
cd bin/
./linux_amd64 the_folder_you_want_to_serve(for example: /home/yingshaoxo/Videos)
```
___

#### Finished list:

* Golang restful api for getting file name and static url
* reactjs show files in a list (categorized by folder name)
* integrated with DPlayer

___

#### Todo list:

* supprt VR right in browser
* complie with html files, so all source could be a single binary file
* supprt raspberry pi (with docker)

___

#### Based on:

* https://github.com/gin-gonic/gin

___

#### Thanks to:

* https://medium.com/@synapticsynergy/serving-a-react-app-with-golang-using-gin-c6402ee64a4b
* https://fabianlee.org/2018/05/10/docker-packaging-a-golang-version-of-hello-world-in-a-container/
