
/**
 * @author fenris
 */
class class_task_concat extends class_task {
	
	/**
	 * @author fenris
	 */
	protected inputs_ : Array<lib_path.class_filepointer>;

	
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
		inputs_ : Array<lib_path.class_filepointer> = null,
		output_ : lib_path.class_filepointer = null
	) {
		super(name, sub, active);
		this.inputs_ = inputs_;
		this.output_ = output_;
	}
	
	
	/**
	 * @author fenris
	 */
	public static create(name : string, sub : Array<class_task>, active : boolean, parameters : Object) : class_task_concat {
		return (
			new class_task_concat(
				name, sub, active,
				object_fetch<Array<string>>(parameters, "inputs", [], 2).map(s => lib_path.class_filepointer.read(s)),
				lib_path.class_filepointer.read(object_fetch<string>(parameters, "output", null, 2))
			)
		);
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public inputs() : Array<lib_path.class_filepointer> {
		return this.inputs_;
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
			new class_action_concat(
				this.inputs_,
				this.output_
			),
		];
	}
	
}

class_task.register("concat", /*(name, sub, active, parameters) => */class_task_concat.create/*(name, sub, active, parameters)*/);

