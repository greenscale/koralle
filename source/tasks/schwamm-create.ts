
/**
 * @author fenris
 */
class_tasktemplate.register(
	"schwamm-create",
	new class_tasktemplate(
		{
			"description": null,
			"parameters": [
				new class_taskparameter<Array<string>, Array<lib_path.class_filepointer>>(
					{
						"name": "includes",
						"extraction": raw => raw.map(path => lib_path.filepointer_read(path)),
						"shape": lib_meta.from_raw(
							{
								"id": "array",
								"parameters": {
									"shape_element": {
										"id": "string"
									}
								}
							}
						),
						"default": new class_just<Array<string>>([]),
					}
				),
				new class_taskparameter<{[group : string] : Array<string>}, {[group : string] : Array<lib_path.class_filepointer>}>(
					{
						"name": "adhoc",
						"extraction": raw => lib_object.map<Array<string>, Array<lib_path.class_filepointer>>(
							raw,
							paths => paths.map(path => lib_path.filepointer_read(path))
						),
						"shape": lib_meta.from_raw(
							{
								"id": "map",
								"parameters": {
									"shape_key": {
										"id": "string"
									},
									"shape_value": {
										"id": "array",
										"parameters": {
											"shape_element": {
												"id": "string"
											}
										}
									}
								}
							}
						),
						"default": new class_just<{[group : string] : Array<string>}>({}),
					}
				),
				class_taskparameter.output_single(),
			],
			"factory": (data) => {
				let inputs : Array<lib_path.class_filepointer> = [];
				let outputs : Array<lib_path.class_filepointer> = [];
				let actions : Array<class_action> = [];
				// includes
				{
					inputs = inputs.concat(
						data["includes"]
					);
				}
				// adhoc
				{
					inputs = inputs.concat(
						lib_object.values<Array<lib_path.class_filepointer>>(data["adhoc"]).reduce((x, y) => x.concat(y), [])
					);
				}
				// output
				{
					outputs = outputs.concat(
						[data["output"]]
					);
					actions = actions.concat(
						[
							new class_action_mkdir(
								data["output"].location
							),
							new class_action_schwamm(
								data["includes"],
								data["adhoc"],
								data["output"]
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

