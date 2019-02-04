# Local Show (Deprecated)
A local media files showing web app based on Python.

### Fetures
Music and Videos in Web

### Requirements
sanic&jinja2 or flask

### Usage
`python3 app.py /home/Music/` or `python3 app.py your_folder_path`

### Docker
`sudo docker run -d -v <your_file_directory>:/data/files -p 2019:2018 -p 2121:21 -p 8100:8100 --name local_show yingshaoxo/local_show`

Open `http://127.0.0.1:2019`to see the webpage.

### Build Docker Image
`sudo docker build -t yingshaoxo/local_show .`

### Actully, there has a simpler way for the same job
```
sudo python3 -m http.server 80
```
