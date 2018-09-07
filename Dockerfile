FROM ubuntu:18.04

ENV LANG C.UTF-8

RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN apt-get install -y python3.6-dev

COPY ./requirements.txt /usr/src/Local_Show/requirements.txt
RUN pip3 install --no-cache-dir -r /usr/src/Local_Show/requirements.txt

COPY . /usr/src/Local_Show/

RUN mkdir -p /usr/src/Local_Show/files

EXPOSE 2018 
EXPOSE 21

CMD ["python3", "/usr/src/Local_Show/Tools.py", "run_in_docker"]
