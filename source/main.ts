
///<reference path="../../plankton/call/build/logic.d.ts"/>


/**
 * scans a project and its subprojects and constructs a dependency-graph
 * @param {class_filepointer} filepointet the filepointer to the project.json, relative to the current working directory
 * @author fenris
 */
type type_depgraphnode = {filepointer : lib_path.class_filepointer; label : string;}
function scan(
	filepointer : lib_path.class_filepointer,
	data : Object,
	graph : class_graph<type_depgraphnode> = null,
	depth : int = 0
) : lib_call.type_executor<class_graph<type_depgraphnode>, Error> {
	if (graph == null) {
		graph = new class_graph<type_depgraphnode>(
			(x, y) => (x.filepointer.toString() == y.filepointer.toString())
		);
	}
	function make_node(filepointer : lib_path.class_filepointer, data : Object) : type_depgraphnode {
		let name : string = lib_object.fetch<string>(data, "name", filepointer.toString(), 1);
		let node : type_depgraphnode = {"filepointer": filepointer, "label": name};
		return node;
	}
	let node : type_depgraphnode = make_node(filepointer, data);
	if (graph.has(node)) {
		return lib_call.executor_resolve<class_graph<type_depgraphnode>, Error>(graph);
	}
	else {
		graph.nodes.push(node);
		return (
 			lib_call.executor_chain<class_graph<type_depgraphnode>, Error>(
				graph,
				lib_object.fetch<Array<string>>(data, "dependencies", [], 0).map(
					path => graph_ => (resolve__, reject__) => {
						let filepointer_ : lib_path.class_filepointer = filepointer.foo(lib_path.filepointer_read(path));
						read_json(filepointer_.toString())(
							data_ => {
								scan(filepointer_, data_, graph_, depth+1)(
									graph_ => {
										let node_ : type_depgraphnode = make_node(filepointer_, data_);
										let edge : type_edge<type_depgraphnode> = {"from": node_, "to": node};
										graph_.edges.push(edge);
										resolve__(graph_/*.hasse()*/);
									},
									reject__
								);
							},
							reason => {
								reject__(reason);
							}
						);
					}
				)
			)
		);
	}
}


/**
 * @author fenris
 */
function main(args : Array<string>) : void {
	/*
	let argumentparser : lib_arguments.class_argumentparser = new lib_arguments.class_parser(
		[
			new lib_arguments.class_argument_volatile<string>(
				{
					"type": "string",
					"ids_long": ["target"],
					"ids_short": ["t"],
					"default": "gnumake",
					"info": "the target build system; valid values are 'gnumake','ant'",
				}
			),
			new lib_arguments.class_argument_volatile<string>(
				{
					"type": "string",
					"ids_long": ["system"],
					"ids_short": ["s"],
					"default": "unix",
					"info": "the target platform; valid values are 'unix', 'win'; default is 'unix'",
				}
			),
			new lib_arguments.class_argument_volatile_boolean(
				{
					"type": "boolean",
					"ids_long": ["raw"],
					"ids_short": ["r"],
					"default": false,
					"info": "if set, depedencies are ignored/excluded from the output",
				}
			),
			new lib_arguments.class_argument_volatile<boolean>(
				{
					"type": "boolean",
					"ids_long": ["execute"],
					"ids_short": ["x"],
					"default": false,
					"info": "if set, the build script will be executed instead of being printed to stdout",
				}
			),
		]
	);
	 */
	
	let procede : boolean = args.every(
		function (arg : string) : boolean {
			if ((arg.indexOf("--") == 0) || (arg.indexOf("-") == 0)) {
				let parts : Array<string> = arg.split("=");
				switch (parts[0]) {
					case "--help": case "-h": {
						(new class_message("NAME")).stdout();
						(new class_message("Koralle Build System Abstractor", {"depth": 1})).stdout();
						(new class_message("")).stdout();
						{
							(new class_message("SYNOPSIS")).stdout();
							(new class_message("koralle [--target=gnumake|ant] [--system=unix|win] <path-to-project.json>", {"depth": 1})).stdout();
							(new class_message("")).stdout();
						}
						{
							(new class_message("DESCRIPTION")).stdout();
							(new class_message("Koralle is not a build-system itself. Instead it generates scripts for existing build-systems (e.g. GNU Make, Apache Ant, …) on base of a common json-description-file (usually named 'project.json').", {"depth": 1})).stdout();
							(new class_message("", {"depth": 1})).stdout();
							(new class_message("Koralle is designed for reducing the amount of text needed to define the build-process.", {"depth": 1})).stdout();
							(new class_message("")).stdout();
						}
						{
							(new class_message("OPTIONS")).stdout();
							{
								(new class_message("--target | -t", {"depth": 1})).stdout();
								(new class_message("the target build system; valid values are 'gnumake','ant'; default is 'gnumake'", {"depth": 2})).stdout();
								(new class_message("")).stdout();
							}
							{
								(new class_message("--system | -s", {"depth": 1})).stdout();
								(new class_message("the target platform; valid values are 'unix', 'win'; default is 'unix'", {"depth": 2})).stdout();
								(new class_message("")).stdout();
							}
							{
								(new class_message("--raw | -r", {"depth": 1})).stdout();
								(new class_message("if set, depedencies are ignored/excluded from the output", {"depth": 2})).stdout();
								(new class_message("")).stdout();
							}
							{
								(new class_message("--execute | -x", {"depth": 1})).stdout();
								(new class_message("if set, the build script will be executed", {"depth": 2})).stdout();
								(new class_message("")).stdout();
							}
							{
								(new class_message("--showgraph | -g", {"depth": 1})).stdout();
								(new class_message("if set, the graphviz description of the dependency graph is written to stderr", {"depth": 2})).stdout();
								(new class_message("")).stdout();
							}
							{
								(new class_message("--output | -o", {"depth": 1})).stdout();
								(new class_message("the path of the output file", {"depth": 2})).stdout();
								(new class_message("")).stdout();
							}
							{
								(new class_message("--version | -v", {"depth": 1})).stdout();
								(new class_message("print the version to stdout and exit", {"depth": 2})).stdout();
								(new class_message("")).stdout();
							}
							{
								(new class_message("--help | -h", {"depth": 1})).stdout();
								(new class_message("show this help and exit", {"depth": 2})).stdout();
								(new class_message("")).stdout();
							}
						}
						{
							(new class_message("AUTHOR")).stdout();
							(new class_message("Christian Fraß <frass@greenscale.de>", {"depth": 1})).stdout();
							(new class_message("")).stdout();
						}
						return false;
						break;
					}
					case "--version": case "-v": {
						(new class_message(configuration.version.toString())).stdout();
						return false;
						break;
					}
					case "--target": case "-t": {
						configuration.target = parts[1];
						return true;
						break;
					}
					case "--system": case "-s": {
						configuration.system = parts[1];
						return true;
						break;
					}
					case "--raw": case "-r": {
						configuration.raw = true;
						return true;
						break;
					}
					case "--output": case "-o": {
						configuration.output = parts[1];
						return true;
						break;
					}
					case "--execute": case "-x": {
						configuration.execute = true;
						return true;
						break;
					}
					case "--showgraph": case "-g": {
						configuration.showgraph = true;
						return true;
						break;
					}
					default: {
						return false;
						throw (new Error("unrecognized option '" + parts[0] + "'"));
						break;
					}
				}
			}
			else {
				configuration.path = arg;
				return true;
			}
		}
	);
	if (procede) {
		type type_state = {
			filepointer ?: lib_path.class_filepointer;
			order ?: Array<string>,
			project_raw ?: Object;
			project ?: class_project,
			target ?: class_target,
			output ?: lib_path.class_filepointer,
			script ?: string,
		};
		lib_call.executor_chain<type_state, Error>(
			{},
			[
				// setup temp-folder
				state => (resolve, reject) => {
					switch (configuration.system) {
						case "unix": {
							configuration.tempfolder = "/tmp/";
							resolve(state);
							break;
						}
						case "win": {
							switch (configuration.target) {
								case "gnumake": {
									configuration.tempfolder = "%TEMP%\\";
									resolve(state);
									break;
								}
								case "ant": {
									configuration.tempfolder = "${env.TEMP}\\";
									resolve(state);
									break;
								}
								default: {
									reject(new Error("invalid target '" + configuration.target + "'"));
									break;
								}
							}
							break;
						}
						default: {
							reject(new Error("invalid system '" + configuration.system + "'"));
							break;
						}
					}
				},
				// environment
				state => (resolve, reject) => {
					let filepointer : lib_path.class_filepointer = lib_path.filepointer_read(configuration.path);
					filepointer.location.go_thither();
					state.filepointer = filepointer;
					resolve(state);
				},
				// get jsondata
				state => (resolve, reject) => {
					read_json(state.filepointer.filename)(
						data => {state.project_raw = data; resolve(state);},
						reject
					);
				},
				// scan dependencies
				state => (resolve, reject) => {
					if (configuration.raw) {
						state.order = [/*state.filepointer.toString()*/];
						resolve(state);
					}
					else {
						scan(state.filepointer, state.project_raw)(
							graph => {
								if (configuration.showgraph) {
									let output : string = graph
										.hasse()
										.output_graphviz(
											node => node.label
										)
									;
									(new class_message(output)).stderr();								
								}
								try {
									let order : Array<string> = graph
										.topsort()
										.map(x => x.filepointer.toString())
										.filter(path => (path != state.filepointer.toString()))
									;
									state.order = order;
									resolve(state);
								}
								catch (exception) {
									reject(<Error>(exception));
								}
							},
							reject
						);
					}
				},
				// setup project
				state => (resolve, reject) => {
					state.project = class_project.create(state.project_raw); resolve(state);
				},
				// setup target
				state => (resolve, reject) => {
					let mapping : {[name : string] : class_target} = {
						"ant": new class_target_ant(),
						"gnumake": new class_target_gnumake(),
						"make": new class_target_gnumake(),
					};
					let target : class_target = lib_object.fetch<class_target>(mapping, configuration.target, null, 0);
					if (target == null) {
						reject(new class_error("no implementation found for target '" + configuration.target + "'"));
					}
					else {
						state.target = target;
						resolve(state);
					}
				},
				// generate
				state => (resolve, reject) => {
					state.project.dependencies_set(state.order);
					try {
						let script : string = state.target.compile_project_string(state.project, configuration.raw);
						state.script = script;
						resolve(state);
					}
					catch (exception) {
						reject(<Error>(exception));
					}
				},
				// output
				state => (resolve, reject) => {
					let filepointer : lib_path.class_filepointer;
					if (configuration.output == null) {
						if (! configuration.execute) {
							filepointer = null;
						}
						else {
							filepointer = new lib_path.class_filepointer(
								// new lib_path.class_location(null, new lib_path.class_path(["."])),
								lib_path.location_read(configuration.tempfolder, configuration.system),
								"_koralle_"
							);
						}
					}
					else {
						filepointer = lib_path.filepointer_read(configuration.output);
					}
					if (filepointer == null) {
						(new class_message(state.script)).stdout();
					}
					else {
						_fs.writeFile(filepointer.toString(), state.script);
					}
					state.output = filepointer;
					resolve(state);
				},
				// execution
				state => (resolve, reject) => {
					if (! configuration.execute) {
						resolve(state);
					}
					else {
						state.target.execute(state.output)(
							result => resolve(state),
							reject
						);
					}
				},
			]
		)(
			function (state : type_state) : void {
				// (new class_message("successfull", {"type": "information", "prefix": "koralle"})).stderr();
			},
			function (reason : Error) : void {
				// throw reason;
				console.error(reason);
				(new class_message("an error occured: " + String(reason), {"type": "error", "prefix": "koralle"})).stderr();
			}
		);
	}
}


main(process.argv.slice(2));

