#! /usr/bin/env bash
boot2docker shellinit >/tmp/init.sh
. /tmp/init.sh
docker build -t ksp/code-challenge-web -f Dockerfile-web .
docker build -t ksp/code-challenge-db -f Dockerfile-db .
docker build -t ksp/code-challenge-node -f frontend-chat/Dockerfile-node frontend-chat

docker run -d --name db ksp/code-challenge-db
docker run -d -p 8080:8080 --name web --link db:db ksp/code-challenge-web
docker run -d -p 3000:3000 --name node ksp/code-challenge-node