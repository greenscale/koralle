
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
				"inputs": inputs = [],
				"output": output = null,
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
		let inputs_ : Array<lib_path.class_filepointer> = lib_call.use(
			inputs,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		let output_ : lib_path.class_filepointer = lib_call.use(
			output,
			x => lib_path.filepointer_read(x)
		);
		let filepointer_temp : lib_path.class_filepointer = new lib_path.class_filepointer(
			lib_path.location_read(configuration["tempfolder"]),
			"_.less"
		);
		super(
			name, sub, active,
			inputs_,
			[output_],
			[
				new class_action_mkdir(
					output_.location
				),
				new class_action_concat(
					inputs_,
					filepointer_temp
				),
				new class_action_lessc(
					filepointer_temp,
					output_
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

