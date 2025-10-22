#!/bin/bash
echo "Stopping existing Go app..."
sudo systemctl stop dynviz || true
