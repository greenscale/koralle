
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
				"inputs": inputs = [],
				"output": output = null,
				"only_first": only_first = false,
			},
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters : {
				inputs ?: Array<string>;
				output ?: string;
				only_first ?: boolean;
			};
		}
	) {
		let inputs_ : Array<lib_path.class_filepointer> = lib_call.use(
			inputs,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		let output_ : lib_path.class_filepointer = lib_call.use(
			output,
			x => lib_path.filepointer_read(x)
		);
		super(
			name, sub, active,
			inputs_,
			[output_],
			[
				new class_action_mkdir(
					output_.location
				),
				new class_action_php(
					inputs_,
					output_,
					only_first
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

