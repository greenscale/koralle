
/**
 * @author fenris
 */
class class_task_lesscss extends class_task {
	
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
	public static create(name : string, sub : Array<class_task>, active : boolean, parameters : Object) : class_task_lesscss {
		return (
			new class_task_lesscss(
				name, sub, active,
				object_fetch<Array<string>>(parameters, "inputs", null, 2).map(s => lib_path.filepointer_read(s)),
				lib_path.filepointer_read(object_fetch<string>(parameters, "output", null, 2))
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
		let filepointer_temp : lib_path.class_filepointer = new lib_path.class_filepointer(lib_path.location_read(configuration["tempfolder"]), "_.less");
		return [
			new class_action_mkdir(
				this.output_.location
			),
			new class_action_concat(
				this.inputs_,
				filepointer_temp
			),
			new class_action_lessc(
				filepointer_temp,
				this.output_
			),
		];
	}
	
}

class_task.register("lesscss", /*(name, sub, active, parameters) => */class_task_lesscss.create/*(name, sub, active, parameters)*/);

