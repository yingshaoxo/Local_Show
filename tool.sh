#!/bin/bash

run() {
    sudo apt-get install -y python3.6
    sudo apt-get install -y python3-pip
    sudo apt-get install -y python3.6-dev
    sudo pip3 install --no-cache-dir -r requirements.txt

    #nohup python3.6 app/app.py &
    #gunicorn -b 0.0.0.0:2018 --workers=2 app.app:app &
    python3.6 app/app.py &
}

docker_run() {
    python3.6 /usr/src/Local_Show/app/app.py /usr/src/Local_Show/files
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
    rm -fr __pycache__
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



### way to fix docker 

# sudo docker logs local_show

# sudo docker run --name local_show -it yingshaoxo/local_show:1.0 /bin/bash

# sudo docker attach local_show
# sudo docker exec -i -t local_show /bin/bash

# sudo docker commit local_show yingshaoxo/local_show:1.0



### docker building

# sudo docker build -t yingshaoxo/local_show:1.0 .
