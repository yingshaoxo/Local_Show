FROM alpine:3.7

RUN mkdir -p /bin
COPY ./bin/linux_amd64 /bin/

RUN mkdir -p /client/build
COPY ./client/build /client/build

RUN mkdir -p /data

WORKDIR /bin

EXPOSE 5000

CMD ["/bin/linux_amd64", "/data"]
