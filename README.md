# Local Show 
A local media files showing web app based on Python.

### Fetures
Music and Videos.

### Requirements
sanic&jinja2 or flask

### Usage
`python3 app.py /home/Music/` or `python3 app.py your_folder_path`

### Docker
`sudo docker run -d -v <your_file_directory>:/usr/src/Local_Show/files -p 2018:2018 --name local_show yingshaoxo/local_show`
