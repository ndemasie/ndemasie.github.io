#!/usr/bin/env bash

ARGS="$@"

# DESCRIPTION
# Bash script which builds the app in a docker container and copies out ./dist

get_last_image() { docker images --format "{{.ID}} {{.CreatedAt}}" | sort --reverse --key 2 | awk 'NR==1{print $1}'; }

# Build
docker image build --force-rm "$ARGS" .

image_id=$(get_last_image)
container_id=$(docker container create $image_id)

docker cp $container_id:/root/dist ./dist

docker rm --force $container_id