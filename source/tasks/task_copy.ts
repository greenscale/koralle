
/**
 * @author fenris
 */
class class_task_copy extends class_task {
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"sub": sub,
			"active": active,
			"parameters": {
				"input": input = null,
				"output": output = null,
				"folder": folder = false,
			},
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters : {
				input ?: string;
				output ?: string;
				folder ?: boolean;
			};
		}
	) {
		let input_ : lib_path.class_filepointer = lib_call.use(
			input,
			x => lib_path.filepointer_read(x)
		);
		let output_ : lib_path.class_filepointer = lib_call.use(
			output,
			x => lib_path.filepointer_read(x)
		);
		super(
			name, sub, active,
			[input_],
			[output_],
			[
				new class_action_mkdir(
					output_.location
				),
				new class_action_copy(
					input_,
					output_,
					folder
				),
			]
		);
	}
	
}

class_task.register(
	"copy",
	(name, sub, active, parameters) => new class_task_copy(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

