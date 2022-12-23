#!/bin/bash

#sudo apt install golang -y

# go env -w GO111MODULE=on
# go env -w GOPROXY=https://goproxy.cn,direct
go get ./... && go mod tidy

name="LocalShow"

export CGO_ENABLED=0
go install github.com/mitchellh/gox@latest
export PATH=~/go/bin:$PATH

cp -rf ../client/dist ./ 
rm -fr ./ui
mv -f ./dist ./ui

mkdir binary
cd binary
gox -output="${name}_{{.OS}}_{{.Arch}}" -osarch="linux/amd64" -osarch="linux/arm64" -osarch="darwin/arm64" -osarch="windows/386" ../


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


executable_target_path="$(pwd)/${name}_${system}_${architecture}"
chmod 777 $executable_target_path

echo -e '\n'
echo -e "Run the following command:\n${executable_target_path} <Your media folder>"
