
/**
 * @author fenris
 */
class class_task_empty extends class_task {
	
	/**
	 * @author fenris
	 */
	protected output_ : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	constructor(
		name : string = null,
		sub : Array<class_task> = [],
		active : boolean = true,
		output_ : lib_path.class_filepointer = null
	) {
		super(name, sub, active);
		this.output_ = output_;
	}
	
	
	/**
	 * @author fenris
	 */
	public static create(name : string, sub : Array<class_task>, active : boolean, parameters : Object) : class_task_empty {
		return (
			new class_task_empty(
				name, sub, active,
				lib_path.class_filepointer.read(object_fetch<string>(parameters, "output", null, 2))
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
		return [this.output_];
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public actions() : Array<class_action> {
		return [
			new class_action_mkdir(
				this.output_.location
			),
			new class_action_touch(
				this.output_
			),
		];
	}
	
}

class_task.register("empty", /*(name, sub, active, parameters) => */class_task_empty.create/*(name, sub, active, parameters)*/);

