
/**
 * @author fenris
 */
class class_task_linklist_apply extends class_task {
	
	/**
	 * @author fenris
	 */
	protected path : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected outputs_ : {[group : string] : lib_path.class_filepointer};
	
	
	/**
	 * @author fenris
	 */
	constructor(
		name : string = null,
		sub : Array<class_task> = [],
		active : boolean = true,
		path : lib_path.class_filepointer,
		outputs_ : {[group : string] : lib_path.class_filepointer}
	) {
		super(name, sub, active);
		this.path = path;
		this.outputs_ = outputs_;
	}
	
	
	/**
	 * @author fenris
	 */
	public static create(name : string, sub : Array<class_task>, active : boolean, parameters : Object) : class_task_linklist_apply {
		return (
			new class_task_linklist_apply(
				name, sub, active,
				lib_path.filepointer_read(lib_object.fetch<string>(parameters, "path", null, 0)),
				lib_object.map<string, lib_path.class_filepointer>(
					lib_object.fetch<{[group : string] : string}>(
						parameters,
						"outputs",
						{},
						0
					),
					output => lib_path.filepointer_read(output)
				)
			)
		);
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public inputs() : Array<lib_path.class_filepointer> {
		return [this.path];
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public outputs() : Array<lib_path.class_filepointer> {
		return lib_object.to_array(this.outputs_).map(x => x.value);
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public actions() : Array<class_action> {
		return (
			[]
			.concat(
				lib_object.to_array(this.outputs_).map(
					pair => new class_action_mkdir(
						pair.value.location
					),
				)
			)
			.concat(
				[
					new class_action_linklist_apply(
						this.path,
						this.outputs_
					),
				]
			)
		);
	}
	
}

class_task.register("schwamm-apply", /*(name, sub, active, parameters) => */class_task_linklist_apply.create/*(name, sub, active, parameters)*/);

