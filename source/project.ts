
/**
 * @author fenris
 */
type type_rawproject = {
	name ?: string;
	version ?: string;
	dependencies ?: Array<string>;
	roottask ?: type_rawtask;
};


/**
 * @author fenris
 */
type type_depgraphnode = {
	filepointer : lib_path.class_filepointer;
	rawproject : type_rawproject;
};


/**
 * scans a project and its subprojects and constructs a dependency-graph (more precise: a depth first spanning tree)
 * @param {class_filepointer} filepointet the filepointer to the project.json, relative to the current working directory
 * @author fenris
 */
function scan(
	node : type_depgraphnode,
	graph : class_graph<type_depgraphnode> = null,
	depth : int = 0
) : lib_call.type_executor<class_graph<type_depgraphnode>, Error> {
	let make_node = function (filepointer : lib_path.class_filepointer, rawproject : type_rawproject = null) : type_depgraphnode {
		let node : type_depgraphnode = {"filepointer": filepointer, "rawproject": rawproject};
		return node;
	};
	if (graph == null) {
		graph = new class_graph<type_depgraphnode>(
			(x, y) => (x.filepointer.toString() == y.filepointer.toString())
		);
		graph.nodes.push(node);
	}
	return (
		(resolve, reject) => {
			lib_file.read_json(node.filepointer.toString())(
				data => {
					node.rawproject = data;
		 			lib_call.executor_chain<class_graph<type_depgraphnode>, Error>(
						graph,
						lib_object.fetch<Array<string>>(lib_object.fetch<type_rawproject>(node, "rawproject", {}, 0), "dependencies", [], 0).map(
							path => graph_ => (resolve_, reject_) => {
								let node_ : type_depgraphnode = make_node(node.filepointer.foo(lib_path.filepointer_read(path)));
								if (graph.has(node_)) {
									return lib_call.executor_resolve<class_graph<type_depgraphnode>, Error>(graph);
								}
								else {
									graph.nodes.push(node_);
									scan(node_, graph_, depth+1)(
										graph_ => {
											let edge : type_edge<type_depgraphnode> = {"from": node_, "to": node};
											graph_.edges.push(edge);
											resolve_(graph_/*.hasse()*/);
										},
										reject_
									);
								}
							}
						)
					)(
						resolve,
						reject
					);
				},
				reason => {
					reject(reason);
				}
			);
		}
	);
}


/**
 * @author fenris
 */
class class_project {
	
	/**
	 * @author fenris
	 */
	protected name : string;
	
	
	/**
	 * @author fenris
	 */
	protected version : string;
	
	
	/**
	 * @author fenris
	 */
	protected task : class_task;
	
	
	/**
	 * @author fenris
	 */
	protected graph : class_graph<type_depgraphnode>;
	
	
	/**
	 * @author fenris
	 */
	public constructor(name : string, version : string, task : class_task) {
		this.name = name;
		this.version = version;
		this.task = task;
		this.graph = null;
	}
	
	
	/**
	 * @author fenris
	 */
	public name_get() : string {
		return this.name;
	}
	
	
	/**
	 * @author fenris
	 */
	public roottask_get() : class_task {
		return this.task;
	}

	
	/**
	 * @author fenris
	 */
	public graph_get() : class_graph<type_depgraphnode> {
		return this.graph;
	}
	
	
	/**
	 * @author fenris
	 */
	/*
	public dependencytasks(output : string) : Array<class_task> {
		return (
			this.dependencies_all.map(
				function (path : string, index : int) : class_task_dependency {
					return (
						new class_task_dependency(
							{
								"name": `__dependency_${index.toString()}`,
								"parameters": {
									"path": path,
									"output": output,
									"raw": true,
								},
							}
						)
					);
				}
			)
		);
	}
	 */
	
	
	/**
	 * @author fenris
	 */
	public static create(filepointer : lib_path.class_filepointer) : lib_call.type_executor<class_project, Error> {
		return (
			(resolve, reject) => {
				let node : type_depgraphnode = {"filepointer": filepointer, "rawproject": null};
				scan(node)(
					graph => {
						let {
							"name": name = "(nameless project)",
							"version": version = "0.0.0",
							"dependencies": dependencies = [],
							"roottask": roottask = null,
						} : type_rawproject = node.rawproject;
						try {
							let order : Array<string> = graph
								.topsort()
								.map(x => x.filepointer.toString())
								.filter(path => (path != filepointer.toString()))
							;
						}
						catch (exception) {
						}
					},
					reason => reject(new class_error("scanning dependencies failed", [reason]))
				);
				/*
				// dependencies_raw : Array<type_rawproject> = []
				let core : class_task = class_task.create(roottask);
				let dependencies : Array<class_task> = dependencies_raw.map(dependency_raw => class_task.create(dependency_raw.roottask));
				let main : class_task = new class_task_main(core, dependencies);
				let project : class_project = new class_project(name, version, main);
				scan(filepointer)(
					graph => {
						project.graph = graph;
						resolve(project);
					}
				)
				 */
			}
		);
	}
	
}

