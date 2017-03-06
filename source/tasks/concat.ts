
/**
 * @author fenris
 */
class class_task_concat extends class_task {
	
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
				"input_from_schwamm": schwamminput_raw = null,
				"output": output_raw = undefined,
			},
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters ?: {
				inputs ?: Array<string>;
				input_from_schwamm ?: type_schwamminput_raw;
				output ?: string;
			};
		}
	) {
		if (inputs_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("concat", name, "inputs")));
		}
		let inputs : Array<lib_path.class_filepointer> = lib_call.use(
			inputs_raw,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		let schwamminput : type_schwamminput = (
			(schwamminput_raw == null)
			? null
			: {
				"path": lib_path.filepointer_read(schwamminput_raw.path),
				"group": schwamminput_raw.group,
			}
		);
		if (output_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("concat", name, "output")));
		}
		let output : lib_path.class_filepointer = lib_call.use(
			output_raw,
			x => lib_path.filepointer_read(x)
		);
		super(
			name, sub, active,
			(
				[]
				.concat(inputs)
				.concat(
					(schwamminput == null)
					? []
					: [schwamminput.path]
				)
			),
			[output],
			[
				new class_action_mkdir(
					output.location
				),
				new class_action_concat(
					inputs,
					output
				),
			]
		);
	}
		
}

class_task.register(
	"concat",
	(name, sub, active, parameters) => new class_task_concat(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

