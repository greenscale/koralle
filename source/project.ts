
/**
 * @author fenris
 */
type type_rawproject = {
	name ?: string;
	version ?: string;
	roottask ?: type_rawtask;
};


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
	public constructor(name : string, version : string, task : class_task) {
		this.name = name;
		this.version = version;
		this.task = task;
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
	public static create(
		{
			"name": name = "(nameless project)",
			"version": version = "0.0.0",
			"dependencies": [],
			"roottask": roottask = null,
		} : type_rawproject,
		dependencies_raw : Array<type_rawproject> = []
	) : class_project {
		let core : class_task = class_task.create(roottask);
		let dependencies : Array<class_task> = dependencies_raw.map(dependency_raw => class_task.create(dependency_raw.roottask));
		let main : class_task = new class_task_main(core, dependencies);
		return (new class_project(name, version, main));
	}
	
}

