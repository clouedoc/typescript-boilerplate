#!/bin/sh

export DISPLAY=:99
Xvfb $DISPLAY -screen 0 1024x768x16 -nolisten tcp -nolisten unix &
fluxbox &
