# Let you enjoy your PC media from webpage


> Aim to use reactjs create html files, then use golang to serve.

___

#### Complie:
```
./Tools.sh build
```

#### Usage:

```
# make some changes to docker-compose.yml
sudo docker-compose up -d
# go to localhost:8000/ui/ for downloading, localhost:8000 for file-management, localhost:43110 for magnet-link, localhost:5000 for watching.
```

or

```
cd bin/
./linux_amd64 the_folder_you_want_to_serve(for example: /home/yingshaoxo/Videos)
```
___

#### Finished Feature list:

* Golang restful api for getting file_name and static url
* reactjs show files in a list (categorized by folder name)
* integrate with DPlayer

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
