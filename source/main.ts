

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
						lib_file.read_json(filepointer_.toString())(
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
				// get jsondata
				state => (resolve, reject) => {
					lib_file.read_json(state.filepointer.filename)(
						data => {state.project_raw = data; resolve(state);},
						reason => reject(new class_error(`project description file '${state.filepointer.toString()}' couldn't be read`, [reason]))
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
							reason => reject(new class_error("scanning dependencies failed", [reason]))
						);
					}
				},
				// setup project
				state => (resolve, reject) => {
					state.project = class_project.create(state.project_raw);
					resolve(state);
				},
				// generate
				state => (resolve, reject) => {
					state.project.dependencies_set(state.order);
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

