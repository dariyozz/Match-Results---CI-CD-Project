#!/bin/bash

# Delete cluster if exists
k3d cluster delete sports-cluster || true

# Create cluster
k3d cluster create sports-cluster --volume /home/dariyozz/k3d-postgres-data:/home/dariyozz/k3d-postgres-data@all --port "8088:80@loadbalancer"


