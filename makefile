# Project "koralle"
# This makefile was generated by Koralle 0.1.1

~root:  ~root_~logging ~dependencies ~core
.PHONY: ~root

~root_~logging: 
	@ echo "[log] <koralle> ~root"
.PHONY: ~root_~logging

~dependencies:  ~dependencies_~logging
.PHONY: ~dependencies

~dependencies_~logging: 
	@ echo "[log] <koralle> 	~dependencies"
.PHONY: ~dependencies_~logging

~core:  ~core_~logging all
.PHONY: ~core

~core_~logging: 
	@ echo "[log] <koralle> 	~core"
.PHONY: ~core_~logging

all:  all_~logging link
.PHONY: all

all_~logging: 
	@ echo "[log] <koralle> 		all"
.PHONY: all_~logging

link:  link_~logging build build/koralle.js
.PHONY: link

link_~logging: 
	@ echo "[log] <koralle> 			link"
.PHONY: link_~logging

build/koralle.js:  source/disclaimer.js libs/plankton.js temp/unlinked.js
	@ mkdir -p build/
	@ cat source/disclaimer.js libs/plankton.js temp/unlinked.js > build/koralle.js

build:  build_~logging temp/unlinked.js
.PHONY: build

build_~logging: 
	@ echo "[log] <koralle> 				build"
.PHONY: build_~logging

temp/unlinked.js:  libs/plankton.d.ts source/base.ts source/helpers/message.ts source/helpers/cliout.ts source/helpers/graph.ts source/helpers/gnumake.ts source/helpers/ant.ts source/helpers/markdown.ts source/actions/_action.ts source/actions/exec.ts source/actions/echo.ts source/actions/mkdir.ts source/actions/touch.ts source/actions/copy.ts source/actions/move.ts source/actions/concat.ts source/actions/lessc.ts source/actions/babel.ts source/actions/tsc.ts source/actions/php.ts source/actions/gitpull.ts source/actions/schwamm.ts source/actions/schwamm-create.ts source/actions/schwamm-apply.ts source/actions/locmerge.ts source/tasks/_task.ts source/tasks/group.ts source/tasks/each.ts source/tasks/empty.ts source/tasks/copy.ts source/tasks/concat.ts source/tasks/typescript.ts source/tasks/lesscss.ts source/tasks/php.ts source/tasks/babel.ts source/tasks/schwamm.ts source/tasks/schwamm-create.ts source/tasks/schwamm-apply.ts source/tasks/locmerge.ts source/tasks/script.ts source/outputs/_output.ts source/outputs/regular.ts source/outputs/ant.ts source/outputs/gnumake.ts source/project.ts source/main.ts
	@ mkdir -p temp/
	@ tsc --allowUnreachableCode --target ES6 libs/plankton.d.ts source/base.ts source/helpers/message.ts source/helpers/cliout.ts source/helpers/graph.ts source/helpers/gnumake.ts source/helpers/ant.ts source/helpers/markdown.ts source/actions/_action.ts source/actions/exec.ts source/actions/echo.ts source/actions/mkdir.ts source/actions/touch.ts source/actions/copy.ts source/actions/move.ts source/actions/concat.ts source/actions/lessc.ts source/actions/babel.ts source/actions/tsc.ts source/actions/php.ts source/actions/gitpull.ts source/actions/schwamm.ts source/actions/schwamm-create.ts source/actions/schwamm-apply.ts source/actions/locmerge.ts source/tasks/_task.ts source/tasks/group.ts source/tasks/each.ts source/tasks/empty.ts source/tasks/copy.ts source/tasks/concat.ts source/tasks/typescript.ts source/tasks/lesscss.ts source/tasks/php.ts source/tasks/babel.ts source/tasks/schwamm.ts source/tasks/schwamm-create.ts source/tasks/schwamm-apply.ts source/tasks/locmerge.ts source/tasks/script.ts source/outputs/_output.ts source/outputs/regular.ts source/outputs/ant.ts source/outputs/gnumake.ts source/project.ts source/main.ts --outFile temp/unlinked.js

documentation:  documentation_~logging jsdoc diagram
.PHONY: documentation

documentation_~logging: 
	@ echo "[log] <koralle> 			documentation"
.PHONY: documentation_~logging

jsdoc:  jsdoc_~logging documentation/generated
.PHONY: jsdoc

jsdoc_~logging: 
	@ echo "[log] <koralle> 				jsdoc"
.PHONY: jsdoc_~logging

documentation/generated:  build/koralle.js
	@ mkdir -p documentation/
	@ /bin/sh tools/jsdoc.sh 'build/koralle.js' 'documentation/generated'

diagram:  diagram_~logging documentation/structure/structure.svg
.PHONY: diagram

diagram_~logging: 
	@ echo "[log] <koralle> 				diagram"
.PHONY: diagram_~logging

documentation/structure/structure.svg:  documentation/structure/structure.gv
	@ mkdir -p documentation/structure/
	@ /bin/sh tools/graphviz.sh 'documentation/structure/structure.gv' 'documentation/structure/structure.svg'

