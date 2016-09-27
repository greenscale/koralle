
/**
 * @author fenris
 */
class class_task_php extends class_task {
	
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
	protected only_first : boolean;
	
	
	/**
	 * @author fenris
	 */
	constructor(
		name : string = null,
		sub : Array<class_task> = [],
		active : boolean = true,
		inputs_ : Array<lib_path.class_filepointer> = null,
		output_ : lib_path.class_filepointer = null,
		only_first : boolean = null
	) {
		super(name, sub, active);
		this.inputs_ = inputs_;
		this.output_ = output_;
		this.only_first = only_first;
	}
	
	
	/**
	 * @author fenris
	 */
	public static create(name : string, sub : Array<class_task>, active : boolean, parameters : Object) : class_task_group {
		return (
			new class_task_php(
				name, sub, active,
				object_fetch<Array<string>>(parameters, "inputs", [], 2).map(s => lib_path.filepointer_read(s)),
				lib_path.filepointer_read(object_fetch<string>(parameters, "output", null, 2)),
				object_fetch<boolean>(parameters, "only_first", false, 0)
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
	 * @author fenris
	 */
	public actions() : Array<class_action> {
		return [
			new class_action_mkdir(
				this.output_.location
			),
			new class_action_php(
				this.inputs_,
				this.output_,
				this.only_first
			),
		];
	}
	
}

class_task.register("php", /*(name, sub, active, parameters) => */class_task_php.create/*(name, sub, active, parameters)*/);

