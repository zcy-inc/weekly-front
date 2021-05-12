#!/bin/bash
rsync -av --delete -e ssh --exclude={'./node_modules','.*'} ./dist/* 用户@服务器ip:/root/weekly/weekly-client/
