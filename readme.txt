Build-System-Abstractor "Koralle"
Copyright (C) 2016  Christian Fraß (frass@greenscale.de)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.



== Build ==

	Initially one has to use the static makefile to build Koralle:
		
		make
	
	If the build was successfull one can use Koralle to generate build-scripts
	by using
	
		node build/koralle.js
	
	This will write the generated makefile to stdout; you can redirect it in
	order to save and execute it (of course you should not overwrite the static
	makefile), e.g.:
	
		node build/koralle.js > makefile_generated
	
	The contents of the static and the generated makefiles should be
	the same. The following command will then build Koralle using Koralles
	GNU Make output:
	
		make --file=makefile_generated
	
	For Apache Ant this would be:
	
		node build/koralle.js --target=ant > build.xml && ant
		

== Examples ==

	Koralle itself is built using Koralle. Looking through the project.json,
	one can get an idea about the general syntax.

