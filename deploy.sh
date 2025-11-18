#!/bin/bash
cd ~/DynViz
sudo docker-compose down || true
sudo docker pull dynprobangalore/dynviz-v1:frontend
sudo docker pull dynprobangalore/dynviz-v1:backend
sudo docker-compose up -d --build

