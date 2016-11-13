
/**
 * @author fenris
 */
class class_task_script extends class_task {
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"sub": sub,
			"active": active,
			"parameters": {
				"path": path_raw = undefined,
				"interpreter": interpreter_raw = null,
				"workdir": workdir_raw = null,
				"inputs": inputs_raw = [],
				"outputs": outputs_raw = [],
			},
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters : {
				path ?: string;
				interpreter ?: string;
				workdir ?: string;
				inputs ?: Array<string>;
				outputs ?: Array<string>;
			};
		}
	) {
		if (path_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("script", name, "path")));
		}
		let path : lib_path.class_filepointer = lib_call.use(
			path_raw,
			x => lib_path.filepointer_read(x)
		);
		let workdir : lib_path.class_location = lib_call.use(
			workdir_raw,
			x => ((x == null) ? null : lib_path.location_read(x))
		);
		let interpreter : lib_path.class_filepointer = lib_call.use(
			interpreter_raw,
			x => ((x == null) ? null : lib_path.filepointer_read(x))
		);
		let inputs : Array<lib_path.class_filepointer> = lib_call.use(
			inputs_raw,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		let outputs : Array<lib_path.class_filepointer> = lib_call.use(
			outputs_raw,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		super(
			name, sub, active,
			inputs,
			outputs,
			(
				[]
				.concat(
					outputs.map(
						output => new class_action_mkdir(
							output.location
						),
					)
				)
				.concat(
					[
						new class_action_exec(
							{
								"inputs": inputs,
								"outputs": outputs,
								"path": path,
								"interpreter": interpreter,
								"workdir": workdir,
							}
						),
					]
				)
			)
		);
	}
	
}

class_task.register(
	"script",
	(name, sub, active, parameters) => new class_task_script(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

