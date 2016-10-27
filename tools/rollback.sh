#!/bin/bash

path_source=build/koralle.js
path_dest=~/programme/koralle/koralle.js
path_backup=~/programme/koralle/koralle.js.bak

rm --force ${path_dest}
cp ${path_backup} ${path_dest}

