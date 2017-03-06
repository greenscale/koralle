
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
	
	
	/**
	 * @author neu3no
	 */
	protected preset : string;
	
	
	/**
	 * @author neu3no
	 */
	protected minify : boolean;
	
	/**
	 * @author neu3no
	 */
	constructor(
		{
			"name": name,
			"sub": sub,
			"active": active,
			"parameters": {
				"minify": minify,
				"preset": preset,
				"inputs": inputs_raw,
				"output": output_raw,
			}
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters ?: {
				minify ?: boolean;
				preset ?: string;
				inputs ?: Array<string>;
				output ?: string;
			};
		}
	) {
		if (inputs_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("babel", name, "inputs")));
		}
		let inputs : Array<lib_path.class_filepointer> = lib_call.use(
			inputs_raw,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		if (output_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("babel", name, "output")));
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
				new class_action_babel(
					inputs,
					output,
					preset,
					minify
				),
			]
		);
	}
	
}

class_task.register(
	"babel",
	(name, sub, active, parameters) => new class_task_babel(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

