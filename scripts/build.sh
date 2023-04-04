#!/usr/bin/env bash

# Build
docker image build --file "./docker/build/Dockerfile" --force-rm .

image_id=$(docker images --format "{{.ID}} {{.CreatedAt}}" | sort -rk 2 | awk 'NR==1{print $1}')
container_id=$(docker container create $image_id)

docker cp $container_id:/root/dist ./dist

docker rm --force $container_id