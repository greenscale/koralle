
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
				"input": input_raw = null,
				"output": output_raw = null,
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
		if (input_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("copy", name, "input")));
		}
		let input : lib_path.class_filepointer = lib_call.use(
			input_raw,
			x => lib_path.filepointer_read(x)
		);
		if (output_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("copy", name, "output")));
		}
		let output : lib_path.class_filepointer = lib_call.use(
			output_raw,
			x => lib_path.filepointer_read(x)
		);
		super(
			name, sub, active,
			folder ? [] : [input],
			folder ? [] : [output],
			[
				new class_action_mkdir(
					output.location
				),
				new class_action_copy(
					input,
					output,
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

