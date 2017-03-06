
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
	log("exploring node " + JSON.stringify(node), 4);
	let make_node = function (filepointer : lib_path.class_filepointer, rawproject : type_rawproject = null) : type_depgraphnode {
		let node : type_depgraphnode = {"filepointer": filepointer, "rawproject": rawproject};
		return node;
	};
	if (graph == null) {
		log("creating new graph", 4);
		graph = new class_graph<type_depgraphnode>(
			(x, y) => (x.filepointer.toString() == y.filepointer.toString())
		);
		graph.nodes.push(node);
	}
	return (
		(resolve, reject) => {
			log("reading description file", 4);
			lib_file.read_json(node.filepointer.toString())(
				data => {
					log("got data", 4);
					node.rawproject = data;
		 			lib_call.executor_chain<class_graph<type_depgraphnode>, Error>(
						graph,
						lib_object.fetch<Array<string>>(lib_object.fetch<type_rawproject>(node, "rawproject", {}, 0), "dependencies", [], 0).map(
							path => graph_ => (resolve_, reject_) => {
								log("looking through path " + path, 4);
								let node_ : type_depgraphnode = make_node(node.filepointer.foo(lib_path.filepointer_read(path)));
								let edge : type_edge<type_depgraphnode> = {"from": node_, "to": node};
								graph_.edges.push(edge);
								if (graph.has(node_)) {
									// return lib_call.executor_resolve<class_graph<type_depgraphnode>, Error>(graph);
									resolve_(graph_);
								}
								else {
									graph.nodes.push(node_);
									scan(node_, graph_, depth+1)(
										graph_ => {
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
	 * @desc [mutator] [setter]
	 * @author fenris
	 */
	public graph_set(graph : class_graph<type_depgraphnode>) : void {
		this.graph = graph;
	}
	
	
	/**
	 * @desc [accessor] [getter]
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
	public static create(filepointer : lib_path.class_filepointer, nameprefix : string = null) : lib_call.type_executor<class_project, Error> {
		return (
			(resolve, reject) => {
				let node : type_depgraphnode = {"filepointer": filepointer, "rawproject": null};
				log("scanning dependencies", 3);
				scan(node)(
					graph => {
						log("got dependency graph", 3);
						let dependencynodes : Array<type_depgraphnode> = null;
						let error : Error = null;
						try {
							log("applying topsort", 3);
							dependencynodes = graph
								.topsort()
								.filter(node => (node.filepointer.toString() != filepointer.toString()))
							;
							error = null;
						}
						catch (exception) {
							error = new class_error("could not sort dependencies; probably circular structure", [exception])
						}
						if (error == null) {
							log("creating core task", 3);
							let core : class_task = class_task.create(node.rawproject.roottask);
							log("creating dependency tasks", 3);
							let dependencies : Array<class_task> = dependencynodes.map(
								(node, index) => {
									let task : class_task = class_task.create(
										node.rawproject.roottask,
										name_mark("dependency_" + (node.rawproject.name || lib_string.generate()))
									);
									task.context_set(node.filepointer.location);
									return task;
								}
							);
							log("creating root task", 3);
							let task : class_task = new class_task_group(
								{
									"name": name_mark("root"),
									"sub": [
										new class_task_group(
											{
												"name": name_mark("dependencies"),
												"sub": dependencies,
											}
										),
										new class_task_group(
											{
												"name": name_mark("core"),
												"sub": [core],
											}
										),
									]
								}
							);
							log("creating project", 3);
							let project : class_project = new class_project(
								node.rawproject.name || "(nameless project)",
								node.rawproject.version || "0.0.0",
								task
							);
							project.graph = graph;
							resolve(project);
						}
						else {
							reject(error);
						}
					},
					reason => reject(new class_error("scanning dependencies failed", [reason]))
				);
			}
		);
	}
	
}

