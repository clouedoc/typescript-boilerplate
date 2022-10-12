#!/bin/bash

# Start VNC server
x11vnc -display "$DISPLAY" -bg -forever -nopw -quiet -xkb