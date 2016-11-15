# Project "koralle"
# This makefile was generated by Koralle 0.0.6

__default: __root
.PHONY: __default

__root: __dependencies __core
.PHONY: __root

__dependencies:
.PHONY: __dependencies

__core: all
.PHONY: __core

all: __logging_all link
.PHONY: all

__logging_all:
	@ echo "[log] <koralle> processing 'all' ..."
.PHONY: __logging_all

link: __logging_link build build/koralle.js
.PHONY: link

__logging_link:
	@ echo "	[log] <koralle> processing 'link' ..."
.PHONY: __logging_link

build/koralle.js: source/disclaimer.js libs/plankton.js temp/unlinked.js
	@ mkdir -p build/
	@ cat source/disclaimer.js libs/plankton.js temp/unlinked.js > build/koralle.js

build: __logging_build temp/unlinked.js
.PHONY: build

__logging_build:
	@ echo "		[log] <koralle> processing 'build' ..."
.PHONY: __logging_build

temp/unlinked.js: libs/plankton.d.ts source/base.ts source/helpers/message.ts source/helpers/cliout.ts source/helpers/graph.ts source/helpers/gnumake.ts source/helpers/ant.ts source/actions/action.ts source/actions/exec.ts source/actions/echo.ts source/actions/koralle.ts source/actions/build.ts source/actions/gnumake.ts source/actions/ant.ts source/actions/mkdir.ts source/actions/touch.ts source/actions/copy.ts source/actions/concat.ts source/actions/lessc.ts source/actions/babel.ts source/actions/tsc.ts source/actions/php.ts source/actions/gitpull.ts source/actions/schwamm-create.ts source/actions/schwamm-apply.ts source/tasks/task.ts source/tasks/group.ts source/tasks/dependency.ts source/tasks/script.ts source/tasks/empty.ts source/tasks/copy.ts source/tasks/concat.ts source/tasks/lesscss.ts source/tasks/babel.ts source/tasks/typescript.ts source/tasks/php.ts source/tasks/schwamm-create.ts source/tasks/schwamm-apply.ts source/outputs/output.ts source/outputs/regular.ts source/outputs/ant.ts source/outputs/gnumake.ts source/project.ts source/main.ts
	@ mkdir -p temp/
	@ tsc --allowUnreachableCode  libs/plankton.d.ts source/base.ts source/helpers/message.ts source/helpers/cliout.ts source/helpers/graph.ts source/helpers/gnumake.ts source/helpers/ant.ts source/actions/action.ts source/actions/exec.ts source/actions/echo.ts source/actions/koralle.ts source/actions/build.ts source/actions/gnumake.ts source/actions/ant.ts source/actions/mkdir.ts source/actions/touch.ts source/actions/copy.ts source/actions/concat.ts source/actions/lessc.ts source/actions/babel.ts source/actions/tsc.ts source/actions/php.ts source/actions/gitpull.ts source/actions/schwamm-create.ts source/actions/schwamm-apply.ts source/tasks/task.ts source/tasks/group.ts source/tasks/dependency.ts source/tasks/script.ts source/tasks/empty.ts source/tasks/copy.ts source/tasks/concat.ts source/tasks/lesscss.ts source/tasks/babel.ts source/tasks/typescript.ts source/tasks/php.ts source/tasks/schwamm-create.ts source/tasks/schwamm-apply.ts source/outputs/output.ts source/outputs/regular.ts source/outputs/ant.ts source/outputs/gnumake.ts source/project.ts source/main.ts --outFile temp/unlinked.js

documentation: __logging_documentation jsdoc diagram
.PHONY: documentation

__logging_documentation:
	@ echo "	[log] <koralle> processing 'documentation' ..."
.PHONY: __logging_documentation

jsdoc: __logging_jsdoc documentation/generated
.PHONY: jsdoc

__logging_jsdoc:
	@ echo "		[log] <koralle> processing 'jsdoc' ..."
.PHONY: __logging_jsdoc

documentation/generated: build/koralle.js
	@ mkdir -p documentation/
	@ /bin/bash tools/jsdoc.sh 'build/koralle.js' 'documentation/generated'

diagram: __logging_diagram documentation/structure/structure.svg
.PHONY: diagram

__logging_diagram:
	@ echo "		[log] <koralle> processing 'diagram' ..."
.PHONY: __logging_diagram

documentation/structure/structure.svg: documentation/structure/structure.gv
	@ mkdir -p documentation/structure/
	@ /bin/bash tools/graphviz.sh 'documentation/structure/structure.gv' 'documentation/structure/structure.svg'
