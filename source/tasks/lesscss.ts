
/**
 * @author fenris
 */
class class_task_lesscss extends class_task {
	
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
				"output": output_raw = undefined,
			}
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters : {
				inputs ?: Array<string>;
				output ?: string;
			};
		}
	) {
		if (inputs_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("lesscss", name, "inputs")));
		}
		let inputs : Array<lib_path.class_filepointer> = lib_call.use(
			inputs_raw,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		if (output_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("lesscss", name, "output")));
		}
		let output : lib_path.class_filepointer = lib_call.use(
			output_raw,
			x => lib_path.filepointer_read(x)
		);
		let filepointer_temp : lib_path.class_filepointer = new lib_path.class_filepointer(
			lib_path.location_read(globalvars.configuration["tempfolder"]),
			"_.less"
		);
		super(
			name, sub, active,
			inputs,
			[output],
			[
				new class_action_mkdir(
					output.location
				),
				new class_action_concat(
					inputs,
					filepointer_temp
				),
				new class_action_lessc(
					filepointer_temp,
					output
				),
			]
		);
	}
	
}

class_task.register(
	"lesscss",
	(name, sub, active, parameters) => new class_task_lesscss(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

