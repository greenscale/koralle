declare var process;
declare var require;

var _child_process = require("child_process");
var _fs = require("fs");

var configuration : {
	version ?: string;
	tempfolder ?: string;
	path_source ?: string;
	path_build ?: string;
	target ?: string;
	system ?: string;
	raw ?: boolean;
	execute ?: boolean;
	output ?: string;
	path ?: string;
} = {};

