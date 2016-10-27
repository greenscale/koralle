
/**
 * @author fenris
 */
class class_task_typescript extends class_task {
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name = null,
			"sub": sub = [],
			"active": active = true,
			"parameters" : {
				"inputs": inputs = [],
				"output": output = null,
				"target": target = null,
				"allowUnreachableCode": allowUnreachableCode = null,
				"declaration": declaration = null,
			}
		} : {
			name : string;
			sub : Array<class_task>;
			active : boolean;
			parameters : {
				inputs ?: Array<string>;
				output ?: string;
				target ?: string;
				allowUnreachableCode ?: boolean;
				declaration ?: string;
			}
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
				new class_action_tsc(
					inputs_,
					output_,
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

