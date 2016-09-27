
/**
 * @author fenris
 */
class class_task_script extends class_task {
	
	/**
	 * @author fenris
	 */
	protected inputs_ : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected outputs_ : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected path : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected interpreter : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	constructor(
		name : string = null,
		sub : Array<class_task> = [],
		active : boolean = true,
		inputs_ : Array<lib_path.class_filepointer>,
		outputs_ : Array<lib_path.class_filepointer>,
		path : lib_path.class_filepointer,
		interpreter : lib_path.class_filepointer = null
	) {
		super(name, sub, active);
		this.inputs_ = inputs_;
		this.outputs_ = outputs_;
		this.path = path;
		this.interpreter = interpreter;
	}
	
	
	/**
	 * @author fenris
	 */
	public static create(name : string, sub : Array<class_task>, active : boolean, parameters : Object) : class_task_script {
		let interpreter_raw : string = object_fetch<string>(parameters, "interpreter", null, 1);
		let interpreter : lib_path.class_filepointer = ((interpreter_raw == null) ? null : lib_path.filepointer_read(interpreter_raw));
		return (
			new class_task_script(
				name, sub, active,
				object_fetch<Array<string>>(parameters, "inputs", [], 1).map(s => lib_path.filepointer_read(s)),
				object_fetch<Array<string>>(parameters, "outputs", [], 1).map(s => lib_path.filepointer_read(s)),
				lib_path.filepointer_read(object_fetch<string>(parameters, "path", null, 2)),
				interpreter
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
		return this.outputs_;
	}
	
	
	/**
	 * @author fenris
	 */
	public actions() : Array<class_action> {
		return (
			[]
			.concat(
				this.outputs_.map(output => new class_action_mkdir(output.location))
			)
			.concat(
				[
					new class_action_exec(
						this.inputs_,
						this.outputs_,
						this.path,
						this.interpreter
					),
				]
			)
		);
	}
	
}

class_task.register("script", /*(name, sub, active, parameters) => */class_task_script.create/*(name, sub, active, parameters)*/);

