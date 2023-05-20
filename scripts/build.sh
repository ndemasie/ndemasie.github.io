#!/usr/bin/env bash

# DESCRIPTION
# Bash script which builds the app in a docker container and copies output to ./dist

get_last_image() { docker images --format "{{.ID}} {{.CreatedAt}}" | sort -rk 2 | awk 'NR==1{print $1}'; }

# Build
docker image build --file "./docker/build/Dockerfile.site" --force-rm .

image_id=$(get_last_image)
container_id=$(docker container create $image_id)

docker cp $container_id:/root/dist ./dist

docker rm --force $container_id