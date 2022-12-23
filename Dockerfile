# docker build --tag yingshaoxo/local_show .
FROM node:latest as node_builder 
COPY ./client /work_space/client
WORKDIR /work_space/client
RUN yarn
RUN yarn build

FROM golang:1.18-bullseye as go_builder 
COPY ./server /work_space/server
WORKDIR /work_space/server
COPY --from=node_builder /work_space/client/dist /work_space/client/dist
RUN bash build.sh



FROM ubuntu:focal
COPY --from=go_builder /work_space/server/binary/LocalShow_linux_amd64 /bin/local_show

WORKDIR /bin
RUN mkdir -p /data

EXPOSE 5012

CMD ["/bin/local_show", "/data"]