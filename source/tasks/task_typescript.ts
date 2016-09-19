
/**
 * @author fenris
 */
class class_task_typescript extends class_task {
	
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
	protected target : string;
	
	
	/**
	 * @author fenris
	 */
	protected allowUnreachableCode : boolean;
	
	
	/**
	 * @author fenris
	 */
	protected declaration : boolean;
	
	
	/**
	 * @author fenris
	 */
	constructor(
		name : string = null,
		sub : Array<class_task> = [],
		active : boolean = true,
		inputs_ : Array<lib_path.class_filepointer> = null,
		output_ : lib_path.class_filepointer = null,
		target : string = null,
		allowUnreachableCode : boolean = null,
		declaration : boolean = null
	) {
		super(name, sub, active);
		this.inputs_ = inputs_;
		this.output_ = output_;
		this.target = target;
		this.allowUnreachableCode = allowUnreachableCode;
		this.declaration = declaration;
	}
	
	
	/**
	 * @author fenris
	 */
	public static create(name : string, sub : Array<class_task>, active : boolean, parameters : Object) : class_task_typescript {
		return (
			new class_task_typescript(
				name, sub, active,
				object_fetch<Array<string>>(parameters, "inputs", [], 1).map(s => lib_path.class_filepointer.read(s)),
				lib_path.class_filepointer.read(object_fetch<string>(parameters, "output", null, 2)),
				object_fetch<string>(parameters, "target", null, 0),
				object_fetch<boolean>(parameters, "allowUnreachableCode", false, 0),
				object_fetch<boolean>(parameters, "declaration", false, 0)
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
			new class_action_tsc(
				this.inputs_,
				this.output_,
				this.target,
				this.allowUnreachableCode,
				this.declaration
			),
		];
	}
	
}

class_task.register("typescript", /*(name, sub, active, parameters) => */class_task_typescript.create/*(name, sub, active, parameters)*/);

