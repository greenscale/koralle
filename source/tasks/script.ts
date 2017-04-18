
/**
 * @author fenris
 */
class_tasktemplate.register(
	"script",
	new class_tasktemplate(
		{
			"description": "executes an external script",
			"parameters": [
				class_taskparameter.input_list({"default": new class_just<Array<string>>([])}),
				class_taskparameter.output_list({"default": new class_just<Array<string>>([])}),
				new class_taskparameter<string, lib_path.class_filepointer>(
					{
						"name": "path",
						"extraction": raw => lib_path.filepointer_read(raw),
						"shape": lib_meta.from_raw({"id": "string"}),
						"default": new class_nothing<string>(),
						"description": "the path to the script",
					}
				),
				new class_taskparameter<string, lib_path.class_filepointer>(
					{
						"name": "interpreter",
						"extraction": raw => ((raw == null) ? null : lib_path.filepointer_read(raw)),
						"shape": lib_meta.from_raw({"id": "string", "parameters": {"soft": true}}),
						"default": new class_just<string>(null),
						"description": "the path to the interpreter to use; if value NULL is given, it is assumed that the script is self-executable",
					}
				),
				new class_taskparameter<string, lib_path.class_location>(
					{
						"name": "workdir",
						"extraction": raw => ((raw == null) ? null : lib_path.location_read(raw)),
						"shape": lib_meta.from_raw({"id": "string", "parameters": {"soft": true}}),
						"default": new class_just<string>(null),
						"description": "the path to the directory from where the script shall be executed; if value NULL is given, the workdir is the location of the script",
					}
				),
			],
			"factory": (data) => {
				return {
					"inputs": data["inputs"],
					"outputs": data["outputs"],
					"actions": (
						[]
						.concat(
							data["outputs"].map(
								output => new class_action_mkdir(
									output.location
								),
							)
						)
						.concat(
							[
								new class_action_exec(
									{
										"inputs": data["inputs"],
										"outputs": data["outputs"],
										"path": data["path"],
										"interpreter": data["interpreter"],
										"workdir": data["workdir"],
									}
								),
							]
						)
					),
				};
			},
		}
	)
);


