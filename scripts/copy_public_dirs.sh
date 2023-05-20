#!/usr/bin/env bash

# DESCRIPTION:
# Copies any dir names "public" under the /src tree and adds them to the /public folder

dirs=$(find ./src -type d -path "*/public");

for dir in "${dirs[@]}"; do
  target="${dir#./src/}"
  target="./site/public/${target%/public}"

  mkdir -p "$target"
  cp -r "$dir" "$target"
done