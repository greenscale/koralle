#!/bin/bash

inputs=$1
outputs=$2

jsdoc --directory=${outputs} ${inputs}

