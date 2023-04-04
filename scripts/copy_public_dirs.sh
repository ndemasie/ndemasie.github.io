#!/usr/bin/env bash

dirs=$(find ./src -type d -path "*/public");

for dir in "${dirs[@]}"; do
  target="${dir#./src/}"
  target="./public/${target%/public}"

  mkdir -p "$target"
  cp -r "$dir" "$target"
done