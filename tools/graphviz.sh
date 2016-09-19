#!/bin/bash

inputs=$1
outputs=$2

dot -Tsvg ${inputs} > ${outputs}

