
/**
 * @author fenris
 */
class class_task_empty extends class_task {
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"sub": sub,
			"active": active,
			"parameters": {
				"output": output_raw = undefined,
			},
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters ?: {
				output ?: string;
			};
		}
	) {
		if (output_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("empty", name, "output")));
		}
		let output : lib_path.class_filepointer = lib_call.use(
			output_raw,
			x => lib_path.filepointer_read(x)
		);
		super(
			name, sub, active,
			[],
			[output],
			[
				new class_action_mkdir(
					output.location
				),
				new class_action_touch(
					output
				),
			]
		);
	}
	
}

class_task.register(
	"empty",
	(name, sub, active, parameters) => new class_task_empty(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

