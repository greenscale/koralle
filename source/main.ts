
/**
 * @author fenris
 */
function main(args : Array<string>) : void {
	let arghandler : lib_args.class_handler = new lib_args.class_handler(
		[
			new lib_args.class_argument(
				{
					"name": "path",
					"type": "string",
					"default": "project.json",
					"info": "the path of the project-description-file",
					"kind": "positional",
					"parameters": {
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "help",
					"type": "boolean",
					"info": "show this help and exit",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["help"],
						"indicators_short": ["h"],
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "tasklist",
					"type": "boolean",
					"info": "show the list of available tasks and exit",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["tasklist"],
						"indicators_short": ["l"],
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "version",
					"type": "boolean",
					"info": "print the version to stdout and exit",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["version"],
						"indicators_short": ["v"],
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "output",
					"type": "string",
					"default": "gnumake",
					"info": "the output build system; valid values are 'gnumake', 'ant'",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["output"],
						"indicators_short": ["o"],
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "system",
					"type": "string",
					"default": "linux",
					"info": "the target platform; valid values are 'linux', 'bsd', 'win'",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["system"],
						"indicators_short": ["s"],
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "file",
					"type": "string",
					"default": null,
					"info": "the file in which the result build script shall be written",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["file"],
						"indicators_short": ["f"],
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "raw",
					"type": "boolean",
					"info": "if set, depedencies are ignored/excluded from the output",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["raw"],
						"indicators_short": ["r"],
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "execute",
					"type": "boolean",
					"info": "if set, the build script will be executed instead of being printed to stdout",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["execute"],
						"indicators_short": ["x"],
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "showgraph",
					"type": "boolean",
					"info": "if set, the graphviz description of the dependency graph is written to stderr",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["showgraph"],
						"indicators_short": ["g"],
					},
				}
			),
		]
	);
	// lib_args.verbosity = 5;
	let argdata : Object = arghandler.read("cli", args.join(" "));
	let procede : boolean = true;
	if (argdata["help"]) {
		(new class_message(
			arghandler.generate_help(
				{
					"programname": "Koralle Build System Abstractor",
					"executable": "koralle",
					"author": "Christian Fraß <frass@greenscale.de>",
					"description": "Koralle is not a build-system itself. Instead it generates scripts for existing build-systems (e.g. GNU Make, Apache Ant, …) on base of a common json-description-file (usually named 'project.json'). Koralle is designed for reducing the amount of text needed to define the build-process.",
				}
			)
		)).stdout();
		procede = false;
	}
	else if (argdata["version"]) {
		(new class_message(configuration.version.toString())).stdout();
		procede = false;
	}
	else if (argdata["tasklist"]) {
		new class_message(class_task.list().map(entry => `\t${entry}\n`).join("")).stdout();
		procede = false;
	}
	else {
		configuration.path = argdata["path"];
		configuration.system = argdata["system"];
		configuration.output = argdata["output"];
		configuration.raw = argdata["raw"];
		configuration.execute = argdata["execute"];
		configuration.showgraph = argdata["showgraph"];
		configuration.file = argdata["file"];
		procede = true;
	}
	if (procede) {
		type type_state = {
			filepointer ?: lib_path.class_filepointer;
			order ?: Array<string>,
			project_raw ?: Object;
			project ?: class_project,
			output ?: class_target,
			file ?: lib_path.class_filepointer,
			script ?: string,
		};
		lib_call.executor_chain<type_state, Error>(
			{},
			[
				// environment
				state => (resolve, reject) => {
					let filepointer : lib_path.class_filepointer = lib_path.filepointer_read(configuration.path);
					filepointer.location.go_thither();
					state.filepointer = filepointer;
					resolve(state);
				},
				// setup output
				state => (resolve, reject) => {
					let mapping : {[name : string] : class_target} = {
						"ant": new class_target_ant(),
						"gnumake": new class_target_gnumake(),
						"make": new class_target_gnumake(),
					};
					let output : class_target = lib_object.fetch<class_target>(mapping, configuration.output, null, 0);
					if (output == null) {
						reject(new class_error(`no implementation found for output '${configuration.output}'`));
					}
					else {
						state.output = output;
						resolve(state);
					}
				},
				// setup temp-folder
				state => (resolve, reject) => {
					try {
						configuration.tempfolder = state.output.tempfolder();
						resolve(state);
					}
					catch (exception) {
						reject(new class_error("couldn't setup temp folder", [exception]));
					}
				},
				// setup project
				state => (resolve, reject) => {
					class_project.create(state.filepointer/*,state.project_raw*/)(
						project => {
							state.project = project;
							resolve(state)
						},
						reject
					);
				},
				// show graph
				state => (resolve, reject) => {
					if (configuration.showgraph) {
						let output : string = state.project.graph_get()
							.hasse()
							.output_graphviz(
								node => node.rawproject.name || node.filepointer.toString()
							)
						;
						(new class_message(output)).stderr();								
					}
					resolve(state);
				},
				// generate
				state => (resolve, reject) => {
					try {
						let script : string = state.output.compile_project_string(state.project, configuration.raw);
						state.script = script;
						resolve(state);
					}
					catch (exception) {
						reject(new class_error("generating build script failed", [exception]));
					}
				},
				// write
				state => (resolve, reject) => {
					let filepointer : lib_path.class_filepointer;
					if (configuration.file == null) {
						if (! configuration.execute) {
							filepointer = null;
						}
						else {
							filepointer = new lib_path.class_filepointer(
								// new lib_path.class_location(null, new lib_path.class_path(["."])),
								lib_path.location_read(configuration.tempfolder, configuration.system),
								// lib_path.class_location.tempfolder(configuration.system),
								"_koralle_"
							);
						}
					}
					else {
						filepointer = lib_path.filepointer_read(configuration.file);
					}
					state.file = filepointer;
					if (filepointer == null) {
						(new class_message(state.script)).stdout();
						resolve(state);
					}
					else {
						_fs.writeFile(
							filepointer.toString(),
							state.script,
							error => {
								if (error == null) {
									resolve(state);
								}
								else {
									reject(new class_error("writing to file failed", [error]));
								}
							}
						);
					}
				},
				// execute
				state => (resolve, reject) => {
					if (! configuration.execute) {
						resolve(state);
					}
					else {
						state.output.execute(state.file)(
							result => resolve(state),
							reason => reject(new class_error("execution of build script failed", [reason]))
						);
					}
				},
			]
		)(
			function (state : type_state) : void {
				// (new class_message("successfull", {"type": "information", "prefix": "koralle"})).stderr();
				process.exit(0);
			},
			function (reason : Error) : void {
				// throw reason;
				// console.error(reason);
				(new class_message(`the following error occured: '${reason.toString()}'`, {"type": "error", "prefix": "koralle"})).stderr();
				process.exit(-1);
			}
		);
	}
}


configuration.invocation = {
	"interpreter": process.argv[0],
	"path": process.argv[1],
};
main(process.argv.slice(2));

