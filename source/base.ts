declare var process;
declare var require;

var nm_child_process = require("child_process");
var nm_fs = require("fs");


/**
 * @author fenris
 */
var globalvars : {
	invocation ?: {
		interpreter ?: string;
		path ?: string;
	};
	configuration ?: {
		version ?: string;
		tempfolder ?: string;
		path_source ?: string;
		path_build ?: string;
		system ?: string;
		raw ?: boolean;
		execute ?: boolean;
		file ?: string;
		output ?: string;
		path ?: string;
		showgraph ?: boolean;
		verbosity ?: int;
		name_splitter ?: string;
		name_prefix ?: string;
	};
} = {
	"configuration": {},
};


/**
 * @author fenris
 */
type type_cmdparams = {
	interpreter ?: string;
	path : string;
	args ?: Array<string>;
	output ?: string;
	system ?: string;
};


/**
 * @author fenris
 */
function name_mark(name : string) : string {
	return (globalvars.configuration.name_prefix + name);
}


/**
 * @author fenris
 */
function dirwrap(location : lib_path.class_location, core : string) : string {
	if (location == null) {
		return core;
	}
	else {
		return `cd ${location.as_string(globalvars.configuration.system)} > /dev/null && ${core} ; cd - > /dev/null`;
	}
}


/**
 * @author fenris
 */
function filepointer_adjust(filepointer : lib_path.class_filepointer, location : lib_path.class_location) : lib_path.class_filepointer {
	return ((location == null) ? filepointer : filepointer.relocate(location));
}


/**
 * @author fenris
 */
function path_augment(path : Array<string>, step : string, aggregate : boolean = true) : Array<string> {
	if (aggregate) {
		return path.concat([step]);
	}
	else {
		return [step];
	}
}


/**
 * @author fenris
 */
function path_dump(path : Array<string>) : string {
	return path.join(globalvars.configuration.name_splitter);
}

