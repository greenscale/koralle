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
	showgraph ?: boolean;
} = {
	"version": "0.0.6",
	"tempfolder": null,
	"path_source": "source",
	"path_build": "build",
	"target": "gnumake",
	"system": "unix",
	"raw": false,
	"execute": false,
	"output": null,
	"path": "project.json",
	"showgraph": false,
};

