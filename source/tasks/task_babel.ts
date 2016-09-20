
/**
 * @author neu3no
 */
class class_task_babel extends class_task {
	
	/**
	 * @author neu3no
	 */
	protected inputs_ : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author neu3no
	 */
	protected output_ : lib_path.class_filepointer;

	protected preset : string;

	protected minify : boolean;
	
	/**
	 * @author neu3no
	 */
	constructor(
		name : string = null,
		sub : Array<class_task> = [],
		active : boolean = true,
		inputs_ : Array<lib_path.class_filepointer> = [],
		output_ : lib_path.class_filepointer = null,
		preset : string = null,
		minify : boolean = null
	) {
		super(name, sub, active);
		this.inputs_ = inputs_;
		this.output_ = output_;
		this.preset = preset;
		this.minify = minify;
	}
	
	
	/**
	 * @author neu3no
	 */
	public static create(name : string, sub : Array<class_task>, active : boolean, parameters : Object) : class_task_babel {
		return (
			new class_task_babel(
				name, sub, active,
				object_fetch<Array<string>>(parameters, "inputs", null, 2).map(x => lib_path.class_filepointer.read(x)),
				lib_path.class_filepointer.read(object_fetch<string>(parameters, "output", null, 2)),
				object_fetch<string>(parameters, "preset", null, 0),
				object_fetch<boolean>(parameters, "minify", false, 0)
			)
		);
	}
	
	
	/**
	 * @override
	 * @author neu3no
	 */
	public inputs() : Array<lib_path.class_filepointer> {
		return this.inputs_;
	}
	
	
	/**
	 * @override
	 * @author neu3no
	 */
	public outputs() : Array<lib_path.class_filepointer> {
		return [this.output_];
	}
	
	
	/**
	 * @author neu3no
	 */
	public actions() : Array<class_action> {
		return [
			new class_action_mkdir(
				this.output_.location
			),
			new class_action_babel(
				this.inputs_,
				this.output_,
				this.preset,
				this.minify
			),
		];
	}
	
}

class_task.register("babel", /*(name, sub, active, parameters) => */class_task_babel.create/*(name, sub, active, parameters)*/);
