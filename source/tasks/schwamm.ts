
/**
 * @author fenris
 */
class_tasktemplate.register(
	"schwamm",
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
						"name": "inputs",
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
				new class_taskparameter<any, any>(
					{
						"name": "output",
						"extraction": raw => {
							let result = {};
							if ("save" in raw) {
								result["save"] = lib_path.filepointer_read(raw["save"]);
							}
							if ("dump" in raw) {
								result["dump"] = lib_object.map<string, lib_path.class_filepointer>(raw["dump"], path => lib_path.filepointer_read(path));
							}
							return result;
						},
						"shape": lib_meta.from_raw(
							{
								"id": "object",
								"parameters": {
									"fields": [
										{
											"name": "save",
											"shape": {
												"id": "string",
												"parameters": {
													"soft": true
												}
											}
										},
										{
											"name": "dump",
											"shape": {
												"id": "map",
												"parameters": {
													"shape_key": {
														"id": "string"
													},
													"shape_value": {
														"id": "string"
													},
													"soft": true
												}
											}
										}
									]
								}
							}
						),
					}
				),
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
				// inputs
				{
					inputs = inputs.concat(
						lib_object.values<Array<lib_path.class_filepointer>>(data["inputs"]).reduce((x, y) => x.concat(y), [])
					);
				}
				// output
				{
					if ("save" in data["output"]) {
						outputs = outputs.concat(
							data["output"]["save"]
						);
						actions = actions.concat(
							[
								new class_action_mkdir(
									data["output"]["save"].location
								),
								new class_action_schwamm(
									data["includes"],
									data["inputs"],
									data["output"]["save"]
								),
							]
						);
					}
					if ("dump" in data["output"]) {
						outputs = outputs.concat(
							lib_object.values<lib_path.class_filepointer>(data["output"]["dump"]).reduce((x, y) => x.concat(y), [])
						);
						actions = actions.concat(
							lib_object.to_array<lib_path.class_filepointer>(data["output"]["dump"])
							.map(
								({"key": key, "value": value}) => [
									new class_action_mkdir(
										value.location
									),
									new class_action_schwamm(
										data["includes"],
										data["inputs"],
										undefined,
										key,
										value
									),
								]
							)
							.reduce((x, y) => x.concat(y), [])
						);
					}
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


