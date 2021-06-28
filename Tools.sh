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
    #go get github.com/gobuffalo/packr/v2/...
    go get github.com/GeertJohan/go.rice
    go get github.com/GeertJohan/go.rice/rice
    go get github.com/skip2/go-qrcode/...

    cd ..
    cd src
    rm rice-box.go
    rice embed-go
    cd ..

    cd bin
    gox -output="LocalShow_{{.OS}}_{{.Arch}}" -osarch="linux/amd64" -osarch="linux/arm64" -osarch="windows/amd64" -osarch="windows/386" ../src
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
