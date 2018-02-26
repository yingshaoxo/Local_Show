FROM ubuntu:17.10

RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN apt-get install -y python3.6-dev

COPY ./requirements.txt /usr/src/Local_Show/requirements.txt
RUN pip3 install --no-cache-dir -r /usr/src/Local_Show/requirements.txt

COPY . /usr/src/Local_Show/

RUN chmod +x /usr/src/Local_Show/tool.sh

RUN mkdir -p /usr/src/Local_Show/files

EXPOSE 2018 

ENV LANG C.UTF-8

CMD ["bash", "/usr/src/Local_Show/tool.sh", "docker_run"]
