
/**
 * @author fenris
 */
class class_task_typescript extends class_task {
	
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
				"target": target = null,
				"allowUnreachableCode": allowUnreachableCode = null,
				"declaration": declaration = null,
			}
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters : {
				inputs ?: Array<string>;
				output ?: string;
				target ?: string;
				allowUnreachableCode ?: boolean;
				declaration ?: string;
			}
		}
	) {
		let inputs : Array<lib_path.class_filepointer> = lib_call.use(
			inputs_raw,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		if (output_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("typescript", name, "output")));
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
				new class_action_tsc(
					inputs,
					output,
					target,
					allowUnreachableCode,
					declaration
				),
			]
		);
	}
	
}

class_task.register(
	"typescript",
	(name, sub, active, parameters) => new class_task_typescript(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

