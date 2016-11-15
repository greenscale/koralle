
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
				"path" : path_raw,
				"outputs" : outputs_raw = null,
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
		if (path_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("schamm-apply", name, "path")));
		}
		let path : lib_path.class_filepointer = lib_call.use(
			path_raw,
			x => lib_path.filepointer_read(x)
		);
		if (outputs_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("schamm-apply", name, "outputs")));
		}
		let outputs : {[group : string] : lib_path.class_filepointer} = lib_call.use(
			outputs_raw,
			x => lib_object.map<string, lib_path.class_filepointer>(x, output => lib_path.filepointer_read(output))
		);
		super(
			name, sub, active,
			[path],
			lib_object.to_array(outputs).map(x => x.value),
			(
				[]
				.concat(
					lib_object.to_array(outputs).map(
						pair => new class_action_mkdir(
							pair.value.location
						),
					)
				)
				.concat(
					[
						new class_action_schwamm_apply(
							path,
							outputs
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

