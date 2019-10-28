hi() {
    echo "hi"
}

build() {
    cd client
    yarn 
    yarn build
    cd ..

    mkdir bin
    rm bin/* -fr
    cd bin
    export CGO_ENABLED=0
    go get github.com/mitchellh/gox
    go get github.com/gin-gonic/gin
    go get github.com/gin-gonic/contrib/static
    go get github.com/gin-contrib/cors
    go get -u github.com/gobuffalo/packr/v2/...
    gox -output="{{.OS}}_{{.Arch}}" -os="linux" -os="windows" ../src
    cd ..
}

serve() {
    architecture=""
    case $(uname -m) in
        i386)   architecture="386" ;;
        i686)   architecture="386" ;;
        x86_64) architecture="amd64" ;;
        arm)    dpkg --print-architecture | grep -q "arm64" && architecture="arm64" || architecture="arm" ;;
    esac

    echo "Tun the follow command: "
    echo cd bin\; ./linux_$architecture "your/dir"
}

push() {
    git add .
    if [ "$2" != "" ]; then
        git commit -m "$2"
    fi
    git commit -m "update"
    git push origin
}

pull() {
    git fetch --all
    git reset --hard origin/master
}

if [ "$1" == "hi" ]; then
    hi

elif [ "$1" == "push" ]; then
    push

elif [ "$1" == "pull" ]; then
    pull

elif [ "$1" == "build" ]; then
    build

elif [ "$1" == "serve" ]; then
    serve

elif [ "$1" == "" ]; then
    echo "
push
pull

build
serve
"

fi
