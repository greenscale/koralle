
/**
 * @author fenris
 */
class_tasktemplate.register(
	"schwamm-apply",
	new class_tasktemplate(
		{
			"description": null,
			"parameters": [
				new class_taskparameter<string, lib_path.class_filepointer>(
					{
						"name": "path",
						"extraction": raw => lib_path.filepointer_read(raw),
						"shape": lib_meta.from_raw({"id": "string"}),
					}
				),
				new class_taskparameter<{[group : string] : Array<string>}, {[group : string] : Array<lib_path.class_filepointer>}>(
					{
						"name": "outputs",
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
			],
			"factory": (data) => {
				let inputs : Array<lib_path.class_filepointer> = [];
				let outputs : Array<lib_path.class_filepointer> = [];
				let actions : Array<class_action> = [];
				// path
				{
					inputs = inputs.concat(
						[data["path"]]
					);
				}
				// output
				{
					outputs = outputs.concat(
						lib_object.values<lib_path.class_filepointer>(data["output"]).reduce((x, y) => x.concat(y), [])
					);
					actions = actions.concat(
						lib_object.to_array<lib_path.class_filepointer>(data["output"])
						.map(
							({"key": key, "value": value}) => [
								new class_action_mkdir(
									value.location
								),
								new class_action_schwamm(
									[data["path"]],
									{},
									undefined,
									key,
									value
								),
							]
						)
						.reduce((x, y) => x.concat(y), [])
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


