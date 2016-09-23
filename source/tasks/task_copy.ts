
/**
 * @author fenris
 */
class class_task_copy extends class_task {
	
	/**
	 * @author fenris
	 */
	protected input_ : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected output_ : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected folder : boolean;
	
	
	/**
	 * @author fenris
	 */
	constructor(
		name : string = null,
		sub : Array<class_task> = [],
		active : boolean = true,
		input_ : lib_path.class_filepointer = null,
		output_ : lib_path.class_filepointer = null,
		folder : boolean = null
	) {
		super(name, sub, active);
		this.input_ = input_;
		this.output_ = output_;
		this.folder = folder;
	}
	
	
	/**
	 * @author fenris
	 */
	public static create(name : string, sub : Array<class_task>, active : boolean, parameters : Object) : class_task_copy {
		return (
			new class_task_copy(
				name, sub, active,
				lib_path.class_filepointer.read(object_fetch<string>(parameters, "input", null, 2)),
				lib_path.class_filepointer.read(object_fetch<string>(parameters, "output", null, 2)),
				object_fetch<boolean>(parameters, "folder", false, 0)
			)
		);
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public inputs() : Array<lib_path.class_filepointer> {
		return [this.input_];
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
			new class_action_copy(
				this.input_,
				this.output_,
				this.folder
			),
		];
	}
	
	
	/**
	 * @author fenris
	 */
	public static make(parameters : Object) : Object {
		/*
		let input : string = object_fetch<string>(
			parameters,
			"input",
			null,
			2
		);
		let output : string = object_fetch<string>(
			parameters,
			"output",
			null,
			2
		);
		let folder : boolean = object_fetch<boolean>(
			parameters,
			"folder",
			false,
			0
		);
		let input_ : lib_path.class_filepointer = lib_path.class_filepointer.read(input);
		let output_ : lib_path.class_filepointer = lib_path.class_filepointer.read(output);
		return {
			"inputs": [
				input_
			],
			"outputs": [
				output_
			],
			"actions": [
				new class_action_mkdir(
					output.location
				),
				new class_action_copy(
					input,
					output,
					folder
				),
			]
		};
		 */
		return null;
	}
	
}

class_task.register("copy", /*(name, sub, active, parameters) => */class_task_copy.create/*(name, sub, active, parameters)*/);

