#!/usr/bin/env bash
nohup node app.js >> log/output.log 2>&1 & echo $! > pid