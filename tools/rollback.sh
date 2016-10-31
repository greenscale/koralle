#!/bin/bash

path_src=build/koralle.js
path_dst=~/programme/koralle/koralle.js
path_bak=~/programme/koralle/koralle.js.bak

rm --force ${path_dst}
cp ${path_bak} ${path_dst}

