
/**
 * @author fenris
 */
class_tasktemplate.register(
	"typescript",
	new class_tasktemplate_aggregator(
		{
			"description": "compiles a list of typescript input files to a single javascript output file",
			"parameters_additional": [
				new class_taskparameter<string, lib_path.class_filepointer>(
					{
						"name": "declaration",
						"extraction": raw => ((raw == null) ? null : lib_path.filepointer_read(raw)),
						"shape": lib_meta.from_raw({"id": "string", "parameters": {"soft": true}}),
						"default": new class_just<string>(null),
						"description": "the path of the file in which to write the declaration; if not set, no declaration-script will be created",
					}
				),
				new class_taskparameter<string, string>(
					{
						"name": "target",
						"shape": lib_meta.from_raw({"id": "string"}),
						"default": new class_just<string>(null),
						"description": "the tsc-switch 'target'; value NULL means 'don't specify'",
					}
				),
				new class_taskparameter<boolean, boolean>(
					{
						"name": "allowUnreachableCode",
						"shape": lib_meta.from_raw({"id": "boolean"}),
						"default": new class_just<boolean>(null),
						"description": "the tsc-switch 'allowUnreachableCode'; value NULL means 'don't specify'",
					}
				),
			],
			"factory": (data) => {
				let inputs : Array<lib_path.class_filepointer> = data["inputs"];
				let outputs : Array<lib_path.class_filepointer> = [data["output"]];
				let actions : Array<class_action> = [
					new class_action_mkdir(
						data["output"].location
					),
					new class_action_tsc(
						data["inputs"],
						data["output"],
						data["target"],
						data["allowUnreachableCode"],
						data["declaration"]
					),
				];
				if (data["declaration"] != null) {
					outputs = outputs.concat(
						[
							data["declaration"],
						]
					);
					actions = actions.concat(
						[
							new class_action_mkdir(
								data["declaration"].location
							),
							new class_action_move(
								{
									"from": new lib_path.class_filepointer(
										data["output"].location,
										data["output"].filename.replace(new RegExp(".js$"), ".d.ts")
									),
									"to": data["declaration"],
								}
							),
						]
					);
				}
				return {
					"inputs": inputs,
					"outputs": outputs,
					"actions": actions,
				};
			},
		}
	)
);


