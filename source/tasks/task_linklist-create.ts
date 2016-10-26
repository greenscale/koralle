
/**
 * @author fenris
 */
class class_task_linklist_create extends class_task {
	
	/**
	 * @author fenris
	 */
	protected includes : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected adhoc : {[group : string] : Array<lib_path.class_filepointer>};
	
	
	/**
	 * @author fenris
	 */
	protected output : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	constructor(
		name : string = null,
		sub : Array<class_task> = [],
		active : boolean = true,
		includes : Array<lib_path.class_filepointer>,
		adhoc : {[group : string] : Array<lib_path.class_filepointer>},
		output : lib_path.class_filepointer
	) {
		super(name, sub, active);
		this.includes = includes;
		this.adhoc = adhoc;
		this.output = output;
	}
	
	
	/**
	 * @author fenris
	 */
	public static create(name : string, sub : Array<class_task>, active : boolean, parameters : Object) : class_task_linklist_create {
		return (
			new class_task_linklist_create(
				name, sub, active,
				lib_object.fetch<Array<string>>(parameters, "includes", null, 0).map(s => lib_path.filepointer_read(s)),
				lib_object.map<Array<string>, Array<lib_path.class_filepointer>>(
					lib_object.fetch<{[group : string] : Array<string>}>(
						parameters,
						"adhoc",
						{},
						0
					),
					members => members.map(member => lib_path.filepointer_read(member))
				),
				lib_path.filepointer_read(lib_object.fetch<string>(parameters, "output", null, 2))
			)
		);
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public inputs() : Array<lib_path.class_filepointer> {
		return [];
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public outputs() : Array<lib_path.class_filepointer> {
		return [];
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public actions() : Array<class_action> {
		return [
			new class_action_mkdir(
				this.output.location
			),
			new class_action_linklist_create(
				this.includes,
				this.adhoc,
				this.output
			),
		];
	}
	
}

class_task.register("linklist-create", /*(name, sub, active, parameters) => */class_task_linklist_create.create/*(name, sub, active, parameters)*/);

