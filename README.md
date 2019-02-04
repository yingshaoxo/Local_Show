# Local Show (Deprecated)
Show your local media files through webpage based on Python3.

### Fetures
Music and Videos in Web

Support invoking `MX Player` in Android

Support directly download from server

### Requirements
sanic&jinja2 or flask

### Usage
`python3 app.py /home/Music/` or `python3 app.py your_folder_path`

### Docker Compose
start: `sudo docker-compose up -d`

stop: `sudo docker-compose down`
___

Open `http://127.0.0.1:8000`to download medium.

Open `http://127.0.0.1:8000/files`to manage files (username: `admin`, password: `admin`).

Open `http://127.0.0.1:2019`to visit medium.

### Docker
`sudo docker run -d -v <your_file_directory>:/data/files -p 2019:2018 -p 8100:8100 --name local_show yingshaoxo/local_show`

Open `http://127.0.0.1:2019`to see the webpage.

### Build Docker Image
`sudo docker build -t yingshaoxo/local_show .`

### Actully, there has a simpler way for the same job
```
sudo python3 -m http.server 80
```
