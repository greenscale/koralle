
/**
 * @author fenris
 */
class class_task_schwamm_apply extends class_task {
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"sub": sub,
			"active": active,
			"parameters": {
				"path" : path,
				"outputs" : outputs = null,
			}
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters ?: {
				path ?: string;
				outputs ?: {[group : string] : string};
			}
		}
	) {
		let path_ : lib_path.class_filepointer = lib_call.use(
			path,
			x => lib_path.filepointer_read(x)
		);
		let outputs_ : {[group : string] : lib_path.class_filepointer} = lib_call.use(
			outputs,
			x => lib_object.map<string, lib_path.class_filepointer>(x, output => lib_path.filepointer_read(output))
		);
		super(
			name, sub, active,
			[path_],
			lib_object.to_array(outputs_).map(x => x.value),
			(
				[]
				.concat(
					lib_object.to_array(outputs_).map(
						pair => new class_action_mkdir(
							pair.value.location
						),
					)
				)
				.concat(
					[
						new class_action_schwamm_apply(
							path_,
							outputs_
						),
					]
				)
			)
		);
	}	
	
}

class_task.register(
	"schwamm-apply",
	(name, sub, active, parameters) => new class_task_schwamm_apply(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

