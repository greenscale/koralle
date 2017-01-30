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

