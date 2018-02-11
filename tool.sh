#!/bin/bash

run() {
    sudo apt-get install -y python3.6
    sudo apt-get install -y python3-pip
    sudo pip3 install --no-cache-dir -r requirements.txt

    nohup python3.6 app/app.py &
}

docker_run() {
    python3.6 /usr/src/webchat/app/app.py
}

pull() {
    git fetch --all
    git reset --hard origin/master
}

push() {
    git add .
    git commit -m "update"
    git push origin
}

clear() {
    rm nohup.out 
    rm -fr app/__pycache__
}

if [ "$1" == "run" ]; then
    run

elif [ "$1" == "docker_run" ]; then
    docker_run

elif [ "$1" == "pull" ]; then
    pull

elif [ "$1" == "push" ]; then
    push

elif [ "$1" == "clear" ]; then
    clear

elif [ "$1" == "" ]; then
    echo "run 
docker_run
pull
push
clear"

fi
