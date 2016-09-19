
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
	protected dependencies_listed : Array<string>;
	
	
	/**
	 * @author fenris
	 */
	protected dependencies_all : Array<string>;
	
	
	/**
	 * @author fenris
	 */
	protected roottask : class_task;
	
	
	/**
	 * @author fenris
	 */
	public constructor(name : string, version : string, dependencies_listed : Array<string>, roottask : class_task) {
		this.name = name;
		this.version = version;
		this.dependencies_listed = dependencies_listed;
		this.dependencies_all = null;
		this.roottask = roottask;
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
	public dependencies_set(dependencies_all : Array<string>) : void {
		this.dependencies_all = dependencies_all;
	}
	
	
	/**
	 * @author fenris
	 */
	public dependencies_get() : Array<string> {
		return this.dependencies_all;
	}
	
	
	/**
	 * @author fenris
	 */
	public roottask_get() : class_task {
		return this.roottask;
	}

	
	/**
	 * @author fenris
	 */
	protected static create_task(raw : Object) : class_task {
		let type : string = object_fetch<string>(raw, "type", null, 2);
		return (
			class_task.get(type)(
				object_fetch<string>(raw, "name", null, 1),
				object_fetch<Array<Object>>(raw, "sub", [], 0).map(raw => class_project.create_task(raw)),
				object_fetch<boolean>(raw, "active", true, 0),
				object_fetch<Object>(raw, "parameters", {}, 0)
			)
		);
	}

	
	/**
	 * @author fenris
	 */
	public static create(project_raw : Object) : class_project {
		let name : string = object_fetch<string>(project_raw, "name", "(nameless project)", 1);
		let version : string = object_fetch<string>(project_raw, "version", "0.0.0", 1);
		let dependencies : Array<string> = object_fetch<Array<string>>(project_raw, "dependencies", [], 0);
		let roottask : class_task = class_project.create_task(object_fetch<Object>(project_raw, "roottask", null, 2));
		// roottask.clean();
		return (new class_project(name, version, dependencies, roottask));
	}
	
}

