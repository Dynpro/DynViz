#!/bin/bash
echo "Starting Go app..."

cd /home/ubuntu/myapp
go build -o dynviz . #/cmd/main.go  # Build the main.go inside cmd
sudo systemctl restart dynviz
