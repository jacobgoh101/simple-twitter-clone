#!/bin/sh

## https://stackoverflow.com/a/20909045/5599288
## Usage:
##   . ./export-env.sh ; $COMMAND
##   . ./export-env.sh ; echo ${MINIENTREGA_FECHALIMITE}

unamestr=$(uname)
if [ "$unamestr" = 'Linux' ]; then

    export $(grep -v '^#' .env | xargs -d '\n')

elif [ "$unamestr" = 'FreeBSD' ]; then

    export $(grep -v '^#' .env | xargs -0)

fi