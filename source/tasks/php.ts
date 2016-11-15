
/**
 * @author fenris
 */
class class_task_php extends class_task {
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"sub": sub,
			"active": active,
			"parameters": {
				"inputs": inputs_raw = [],
				"output": output_raw = null,
				"only_first": only_first = false,
				"only_last": only_last = false,
			},
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters : {
				inputs ?: Array<string>;
				output ?: string;
				only_first ?: boolean;
				only_last ?: boolean;
			};
		}
	) {
		let inputs : Array<lib_path.class_filepointer> = lib_call.use(
			inputs_raw,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		if (output_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("php", name, "output")));
		}
		let output : lib_path.class_filepointer = lib_call.use(
			output_raw,
			x => lib_path.filepointer_read(x)
		);
		super(
			name, sub, active,
			inputs,
			[output],
			[
				new class_action_mkdir(
					output.location
				),
				new class_action_php(
					inputs,
					output,
					only_first,
					only_last
				),
			]
		);
	}
	
}

class_task.register(
	"php",
	(name, sub, active, parameters) => new class_task_php(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

