#!/bin/bash

hi() {
    echo "hi"
}

build() {
    cd client
    yarn 
    yarn build
    cd ..

    cd server
    ./build.sh
    cd ..
}

serve() {
    system=""
    case $(uname -s) in
        Linux*)     system=linux;;
        Darwin*)    system=darwin;;
        *)          system=windows;;
    esac

    architecture=""
    case $(uname -m) in
        i386)   architecture="386" ;;
        i686)   architecture="386" ;;
        x86_64) architecture="amd64" ;;
        arm*)   architecture=$(uname -m) ;;
    esac

    executable_target_path="$(pwd)/server/binary/LocalShow_${system}_${architecture}"
    echo '\n'
    echo "Run the following command:\n${executable_target_path} <Your media folder>'"
}

before_docker_process() {
    build
}

if [ "$1" == "hi" ]; then
    hi

elif [ "$1" == "build" ]; then
    build

elif [ "$1" == "serve" ]; then
    serve

elif [ "$1" ==  ]; then
    echo "
hi
build
serve
before_docker_process
"

fi
